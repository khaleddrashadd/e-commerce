import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import {
  BillboardPage,
  BillboardsPage,
  CategoriesPage,
  CategoryPage,
  ColorPage,
  ColorsPage,
  HomePage,
  SizePage,
  SizesPage,
  StorePage,
  StoreSettingsPage,
} from './pages';
import store from './redux/store';

import { DashboardLayout } from './Layouts';
import {
  storeAction,
  storeLoader,
  insertStoreAction,
  billboardLoader,
  billboardAction,
  billboardsLoader,
  categoriesLoader,
  categoryAction,
  categoryLoader,
  sizeAction,
  sizesLoader,
  sizeLoader,
  colorsLoader,
  colorLoader,
  colorAction,
} from './lib/react-router-dom';

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    path: '/admin',
    element: <HomePage />,
    action: insertStoreAction,
    children: [
      {
        path: ':storeId',
        element: <DashboardLayout />,
        loader: storeLoader,
        children: [
          {
            index: true,
            element: <StorePage />,
          },
          {
            path: 'settings',
            element: <StoreSettingsPage />,
            loader: storeLoader,
            action: storeAction,
          },
          {
            path: 'billboards',
            loader: billboardsLoader,
            id: 'billboards',
            children: [
              {
                index: true,
                element: <BillboardsPage />,
              },
              {
                path: ':billboardId',
                element: <BillboardPage />,
                loader: billboardLoader,
                action: billboardAction,
              },
            ],
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
        ],
      },
    ],
  },
]);

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
        <Provider store={store}>
          <RouterProvider router={router} />
          <Toaster />
        </Provider>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}

export default App;
