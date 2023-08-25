import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ClerkProvider } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import store from './redux/store';
import adminRoutes from '@/lib/react-router-dom/routes/admin';
import storeRoutes from '@/lib/react-router-dom/routes/store';
import { CookiesProvider } from 'react-cookie';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
const router = createBrowserRouter([storeRoutes, adminRoutes]);
function App() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <CookiesProvider defaultSetCookies={{ path: '/' }}>
        <Provider store={store}>
          <Elements
            stripe={stripePromise}
            // options={options}
          >
            <RouterProvider router={router} />
          </Elements>
          <Toaster />
        </Provider>
      </CookiesProvider>
    </ClerkProvider>
  );
}
export default App;
