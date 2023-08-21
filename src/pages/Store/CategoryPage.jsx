import Container from '@/components/ui/Container';
import EmptyState from '@/components/ui/EmptyState';
import { BillboardCover } from '@/components/Store';
import { Filter } from '@/components/Store';
import { ProductCard } from '@/components/Store';
import MobileFilters from '@/components/Store/MobileFilters';
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useRouteLoaderData,
  useSearchParams,
} from 'react-router-dom';
const CategoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { size, color } = useLoaderData();

  const sizeId = searchParams.get('sizeId');
  const colorId = searchParams.get('colorId');

  const products = useRouteLoaderData('filteredProducts');
  const filteredProducts = products.filter((product) => {
    if (!sizeId && !colorId) return true;
    if (sizeId && colorId) {
      return product.sizeId === sizeId && product.colorId === colorId;
    }
    if (sizeId) {
      return product.sizeId === sizeId;
    }
    if (colorId) {
      return product.colorId === colorId;
    }
  });
  return (
    <Container>
      <BillboardCover title="Explore the glasses Collection">
        <img
          className="w-full object-cover"
          src="/src/assets/billboard-photo2.jpg"
          alt="billboard photo"
        />
      </BillboardCover>
      <div className="px-4 sm:px-6 lg:px-8 pb-24 font-urbanist">
        <div className=" flex items-start lg:items-center lg:gap-x-10 flex-col lg:flex-row gap-4">
          <MobileFilters
            size={size}
            color={color}
            variant={!colorId && !sizeId ? 'outline' : 'default'}
          />
          <div className="hidden lg:block flex-shrink-0">
            <Filter
              valueKey="sizeId"
              data={size}
              name="Sizes"
            />
            <Filter
              valueKey="colorId"
              data={color}
              name="Colors"
            />
          </div>
          {filteredProducts?.length === 0 && (
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
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid gap-4">
              {filteredProducts?.map((product) => (
                <ProductCard
                  key={product.id}
                  item={product}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default CategoryPage;
