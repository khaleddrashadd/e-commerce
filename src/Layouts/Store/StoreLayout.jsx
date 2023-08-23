import { Outlet } from 'react-router-dom';
import { Footer } from '@/components/Store';
import { Navbar } from '@/components/Store';
import { PreviewModal } from '@/components/Store/Modals';

const StoreLayout = () => {
  return (
    <>
      <Navbar />
      <PreviewModal />
      <Outlet />
      <Footer />
    </>
  );
};
export default StoreLayout;
