import { Outlet, Navigate, redirect } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { supabase } from '../lib/supabase/Config';
import { toast } from 'react-hot-toast';

const DashboardLayout = () => {
  const { userId } = useAuth();

  return (
    <>
      <div>this will be the navbar</div>
      {userId ? <Outlet /> : <Navigate to="/sign-in" />}
    </>
  );
};

export const loader = async ({ params: { storeId } }) => {
  const { data: store, error } = await supabase
    .from('store')
    .select()
    .eq('id', storeId)
    .limit(1);

  if (error) {
    toast.error('something went wrong 500');
  }

  if (!store || store.length === 0) {
    return redirect('/admin');
  }
  return null;
};
export default DashboardLayout;
