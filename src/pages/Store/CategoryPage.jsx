import Container from '@/components/ui/Container';
import billboardImage from '@/assets/billboard-photo2.jpg';

import EmptyState from '@/components/ui/EmptyState';
import { Filter, ProductCard, BillboardCover } from '@/components/Store';
import MobileFilters from '@/components/Store/MobileFilters';
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
  useRouteLoaderData,
  useSearchParams,
} from 'react-router-dom';
const CategoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const products = useRouteLoaderData('filteredProducts');
  
  const store = useLoaderData();
  
  const sizes = store.size.filter((item) => item.category.id === categoryId);
  const colors = store.color.filter((item) => item.category.id === categoryId);
  
  const [{ description }] = store.category.filter(
    (item) => item.id === categoryId
  );
  const sizeId = searchParams.get('sizeId');
  const colorId = searchParams.get('colorId');
  
  const currentCategoryProducts = products.filter((product) => {
    if (!sizeId && !colorId) return product.categoryId === categoryId;
    if (sizeId && colorId) {
      return (
        product.categoryId === categoryId &&
        product.sizeId === sizeId &&
        product.colorId === colorId
        );
      }
      if (sizeId) {
        return product.categoryId === categoryId && product.sizeId === sizeId;
    }
    if (colorId) {
      return product.categoryId === categoryId && product.colorId === colorId;
    }
  });
  
  return (
    <Container>
      <BillboardCover title={description}>
        <img
          className="w-full object-cover"
          src={billboardImage}
          alt="billboard photo"
        />
      </BillboardCover>
      <div className="px-4 sm:px-6 lg:px-8 pb-24 font-urbanist">
        {currentCategoryProducts.length !== 0 ? (
          <div className="flex items-start lg:items-center lg:gap-x-10 flex-col lg:flex-row gap-4">
            <MobileFilters
              size={sizes}
              color={colors}
              variant={!colorId && !sizeId ? 'outline' : 'default'}
            />
            <div className="hidden lg:block">
              <Filter
                valueKey="sizeId"
                data={sizes}
                name="Sizes"
              />
              <Filter
                valueKey="colorId"
                data={colors}
                name="Colors"
              />
            </div>
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentCategoryProducts?.map((product) => (
                  <ProductCard
                    key={product.id}
                    item={product}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto">
            <EmptyState
              title="No results"
              subtitle="ry changing or removing some of your filters"
              label="Clear all filters"
              showReset
              onClick={() => navigate(location.pathname)}
            />
          </div>
        )}
      </div>
    </Container>
  );
};
export default CategoryPage;
