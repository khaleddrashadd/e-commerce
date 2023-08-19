import { Outlet } from 'react-router-dom';
import {Footer} from '@/components/Store';
import { Navbar } from '@/components/Store';

const StoreLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
export default StoreLayout;
