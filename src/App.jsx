import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import store from './redux/store';
import adminRoutes from '@/lib/react-router-dom/routes/admin';
import storeRoutes from '@/lib/react-router-dom/routes/store';

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;
const router = createBrowserRouter([storeRoutes, adminRoutes]);

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
