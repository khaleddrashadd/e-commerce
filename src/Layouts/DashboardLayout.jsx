import { Outlet, Navigate, redirect } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { supabase } from '../lib/supabase/Config';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';

const DashboardLayout = () => {
  const { userId } = useAuth();

  return (
    <>
      <Navbar />
      {userId ? <Outlet /> : <Navigate to="/sign-in" />}
    </>
  );
};

export const loader = async ({ params: { storeId } }) => {
  const { data: store, error } = await supabase
    .from('store')
    .select()
    .eq('id', storeId)
    .limit(1)
    .single();

  if (error) {
    toast.error(error.message||'something went wrong 500');
  }

  if (!store) {
    return redirect('/admin');
  }
  return store;
};
export default DashboardLayout;
