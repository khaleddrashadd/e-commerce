import {
  StorePage,
  CategoriesPage,
  CategoryPage,
  SizesPage,
  SizePage,
  ColorsPage,
  ColorPage,
  ProductsPage,
  ProductPage,
  OrdersPage,
} from '@/pages/Dashboard';

import { DashboardLayout } from '@/Layouts/Dashboard';

import {
  storeLoader,
  categoriesLoader,
  categoryAction,
  categoryLoader,
  sizeAction,
  sizesLoader,
  sizeLoader,
  colorsLoader,
  colorLoader,
  colorAction,
  productsLoader,
  productAction,
  productLoader,
  ordersLoader,
} from '@/lib/react-router-dom/actions-loaders';

const adminRoutes = {
  path: '/admin',
  element: <DashboardLayout />,
  loader: storeLoader,
  children: [
    {
      index: true,
      element: <StorePage />,
    },
    {
      path: 'categories',
      loader: categoriesLoader,
      id: 'categories',
      children: [
        {
          index: true,
          element: <CategoriesPage />,
        },
        {
          path: ':categoryId',
          element: <CategoryPage />,
          loader: categoryLoader,
          action: categoryAction,
        },
      ],
    },
    {
      path: 'sizes',
      loader: sizesLoader,
      id: 'sizes',
      children: [
        {
          index: true,
          element: <SizesPage />,
        },
        {
          path: ':sizeId',
          element: <SizePage />,
          loader: sizeLoader,
          action: sizeAction,
        },
      ],
    },
    {
      path: 'colors',
      loader: colorsLoader,
      id: 'colors',
      children: [
        {
          index: true,
          element: <ColorsPage />,
        },
        {
          path: ':colorId',
          element: <ColorPage />,
          loader: colorLoader,
          action: colorAction,
        },
      ],
    },
    {
      path: 'products',
      id: 'products',
      loader: productsLoader,
      children: [
        {
          index: true,
          element: <ProductsPage />,
        },
        {
          path: ':productId',
          element: <ProductPage />,
          loader: productLoader,
          action: productAction,
        },
      ],
    },
    {
      path: 'orders',
      element: <OrdersPage />,
      loader: ordersLoader,
    },
  ],
};
export default adminRoutes;
