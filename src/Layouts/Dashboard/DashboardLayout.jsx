import { Outlet, Navigate, useNavigation } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import Navbar from '../../components/Navbar';
import { ClipLoader } from 'react-spinners';
import Loader from '../../components/ui/Loader';
const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};
const DashboardLayout = () => {
  const { userId } = useAuth();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <>
      <Navbar userId={userId} />
      {userId ? <Outlet /> : <Navigate to="/sign-in" />}
      {isLoading && <Loader isLoading={isLoading} />}
    </>
  );
};

export default DashboardLayout;
