import { StoreLayout } from '@/Layouts/Store';
import {
  categoriesLoader,
  productsLoaderUser,
} from '@/lib/react-router-dom/actions-loaders';
import HomePage from '@/pages/Store/HomePage';

const storeRoutes = {
  path: '/',
  element: <StoreLayout />,
  loader: categoriesLoader,
  children: [
    {
      index: true,
      element: <HomePage />,
      loader:productsLoaderUser
    },
  ],
};
export default storeRoutes;
