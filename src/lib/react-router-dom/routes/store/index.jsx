import { StoreLayout } from '@/Layouts/Store';
import {
  categoriesLoader,
  productsLoaderUser,
  productLoader,
} from '@/lib/react-router-dom/actions-loaders';
import { HomePage, ProductPage } from '@/pages/Store/';

const storeRoutes = {
  path: '/',
  element: <StoreLayout />,
  loader: categoriesLoader,
  children: [
    {
      index: true,
      element: <HomePage />,
      loader: productsLoaderUser,
    },
    {
      path: 'product/:productId',
      loader: productsLoaderUser,
      id: 'relatedProducts',
      children: [
        {
          index: true,
          element: <ProductPage />,
          loader: productLoader,
        },
      ],
    },
  ],
};
export default storeRoutes;
