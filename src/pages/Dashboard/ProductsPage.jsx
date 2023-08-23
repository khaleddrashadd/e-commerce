import { useRouteLoaderData } from 'react-router-dom';
import { format } from 'date-fns';
import { Products } from '@/components/Dashboard/products';

const ProductsPage = () => {
  const products = useRouteLoaderData('products');
  const formattedProducts = products?.map((product) => ({
    id: product.id,
    name: product.name,
    color: product.color.name,
    size: product.size.name,
    price: product.price,
    category: product.category.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    imagesUrl: product.imagesUrl,
    quantity: product.quantity,
    createdAt: format(new Date(product.createdAt), 'MMMM do,yyyy'),
  }));
  return (
    <div className="flex flex-col gap-4 pt-6 p-8">
      <Products products={formattedProducts} />
    </div>
  );
};
export default ProductsPage;
