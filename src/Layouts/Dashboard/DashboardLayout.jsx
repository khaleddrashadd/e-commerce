import { Outlet, Navigate, useNavigation } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import {Navbar} from '@/components/Dashboard';
import Loader from '@/components/ui/Loader';
import Container from '@/components/ui/Container';


const DashboardLayout = () => {
  const { userId } = useAuth();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <Container>
      <Navbar userId={userId} />
      {userId ? <Outlet /> : <Navigate to="/sign-in" />}
      {isLoading && <Loader isLoading={isLoading} />}
    </Container>
  );
};

export default DashboardLayout;
