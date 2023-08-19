import { StoreLayout } from '@/Layouts/Store';
import { categoriesLoader } from '@/lib/react-router-dom/actions-loaders/loaders/categories-loader';
import HomePage from '@/pages/Store/HomePage';

const storeRoutes = {
  path: '/',
  element: <StoreLayout />,
  loader: categoriesLoader,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
  ],
};
export default storeRoutes;
