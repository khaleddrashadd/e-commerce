import Container from '@/components/ui/Container';
import { ProductsList, Gallery } from '@/components/Store';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import { Info } from '@/components/Store';

const ProductPage = () => {
  const product = useLoaderData();
  const products = useRouteLoaderData('relatedProducts');
  const suggestedProducts = products?.filter(
    (item) => item.categoryId === product.categoryId
  );
  return (
    <Container>
      <section className="px-4 py-10 sm:px-6 lg:px-8 font-urbanist">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <Gallery images={product?.imagesUrl} />
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <Info data={product} />
          </div>
        </div>
        <hr className="my-10" />
        <ProductsList
          title="Related Items"
          items={suggestedProducts}
        />
      </section>
    </Container>
  );
};
export default ProductPage;
