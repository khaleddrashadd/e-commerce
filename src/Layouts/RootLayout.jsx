import StoreModal from '../components/Modals/StoreModal';
import { SetupPage } from '../pages';

const RootLayout = () => {
  return (
    <>
      <SetupPage />
      <StoreModal isOpen />
    </>
  );
};
export default RootLayout;
