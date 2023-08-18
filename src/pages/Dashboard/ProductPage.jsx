import { useLoaderData } from 'react-router-dom';
import { ProductsForm } from '@/components/Dashboard/products';

const ProductPage = () => {
  const ptoductData = useLoaderData();
  return (
    <div className="flex flex-col gap-4 p-8 pt-6">
      <ProductsForm product={ptoductData} />
    </div>
  );
};
export default ProductPage;
