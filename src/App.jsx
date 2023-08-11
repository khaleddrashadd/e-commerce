import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HomePage, StorePage, StoreSettingsPage } from './pages';
import store from './redux/store';
import { action as storeAction } from '@/components/Modals/StoreModal';

import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import { DashboardLayout } from './Layouts';
import { loader as storeLoader } from './Layouts/DashboardLayout';

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    path: '/admin',
    element: <HomePage />,
    action: storeAction,
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
