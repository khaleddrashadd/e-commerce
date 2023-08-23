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
        <div className="flex flex-col items-center md:flex-row md:gap-8">
          <div className="sm:w-7/12 md:w-5/12">
            <Gallery images={product?.imagesUrl} />
          </div>
          <div className="mt-10 px-4 sm:px-0 self-start sm:mt-16 lg:mt-0">
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
