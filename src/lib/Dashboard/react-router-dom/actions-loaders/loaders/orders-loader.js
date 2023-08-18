import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/Dashboard/supabase/Config';

export const ordersLoader = async ({ params: { storeId } }) => {
  const { data: orders, error } = await supabase
    .from('order')
    .select('*,orderItem(*,product(*))')
    .eq('storeId', storeId)
    .order('createdAt', { ascending: false });

  if (error) return toast.error(error.message || 'something went wrong');

  return orders;
};
