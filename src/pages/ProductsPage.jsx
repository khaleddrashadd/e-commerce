import { useRouteLoaderData } from 'react-router-dom';
import { format } from 'date-fns';
import { Products } from '../components/products';

const ProductsPage = () => {
  const products = useRouteLoaderData('products');
  const formattedProducts = products?.map((products) => ({
    id: products.id,
    name: products.name,
    color: products.color.name,
    size: products.size.name,
    price: products.price,
    category: products.category.name,
    isFeatured: products.isFeatured,
    isArchived: products.isArchived,
    imagesUrl: products.imagesUrl,
    createdAt: format(new Date(products.createdAt), 'MMMM do,yyyy'),
  }));
  return (
    <div className="flex flex-col gap-4 pt-6 p-8">
      <Products product={formattedProducts} />
    </div>
  );
};
export default ProductsPage;
