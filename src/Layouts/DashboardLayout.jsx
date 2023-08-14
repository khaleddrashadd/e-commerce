import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import Navbar from '../components/Navbar';

const DashboardLayout = () => {
  const { userId } = useAuth();

  return (
    <>
      <Navbar userId={userId} />
      {userId ? <Outlet /> : <Navigate to="/sign-in" />}
    </>
  );
};

export default DashboardLayout;
