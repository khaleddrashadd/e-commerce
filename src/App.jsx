import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { RootLayout } from './Layouts';
import store from './redux/store';
// import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
// const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

// if (!clerkPubKey) {
//   throw new Error('Missing Publishable Key');
// }
// return (
//   <ClerkProvider publishableKey={clerkPubKey}>
//     <SignedIn>
//       <div>welcome vite</div>
//     </SignedIn>
//     <SignedOut>
//       <RedirectToSignIn />
//     </SignedOut>
//     <UserButton afterSignOutUrl='/' />
//   </ClerkProvider>
// );
const router = createBrowserRouter([
  { path: '/admin', children: [{ index: true, element: <RootLayout /> }] },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
