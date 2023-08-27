import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ClerkProvider } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import store from './redux/store';
import adminRoutes from '@/lib/react-router-dom/routes/admin';
import storeRoutes from '@/lib/react-router-dom/routes/store';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from './components/ui/theme-provider';

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;
const router = createBrowserRouter([storeRoutes, adminRoutes]);
function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <CookiesProvider defaultSetCookies={{ path: '/' }}>
        <Provider store={store}>
            <ThemeProvider
              defaultTheme="dark"
              storageKey="vite-ui-theme">
              <RouterProvider router={router} />
            </ThemeProvider>
          <Toaster />
        </Provider>
      </CookiesProvider>
    </ClerkProvider>
  );
}
export default App;
