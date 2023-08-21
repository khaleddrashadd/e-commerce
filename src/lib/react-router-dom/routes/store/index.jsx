import { StoreLayout } from '@/Layouts/Store';
import {
  categoriesLoader,
  productsLoaderUser,
  productLoader,
  storeLoader,
  colorsLoader,
} from '@/lib/react-router-dom/actions-loaders';
import { HomePage, ProductPage, CategoryPage } from '@/pages/Store/';

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
    {
      path: 'category/:categoryId',
      loader: productsLoaderUser,
      id: 'filteredProducts',
      children: [
        {
          index: true,
          element: <CategoryPage />,
          loader: storeLoader,
        },
      ],
    },
  ],
};
export default storeRoutes;