import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HomePage, StorePage } from './pages';
import store from './redux/store';
import { action as storeAction } from '@/components/Modals/StoreModal';

import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import { DashboardLayout } from './Layouts';
import { loader as storeLoader } from './Layouts/DashboardLayout';

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    path: '/admin',
    children: [
      {
        index: true,
        element: <HomePage />,
        action: storeAction,
      },
      {
        path: ':storeId',
        element: <DashboardLayout />,
        loader: storeLoader,
        children: [
          {
            index: true,
            element: <StorePage />,
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
      <UserButton afterSignOutUrl="/" />
    </ClerkProvider>
  );
}

export default App;
