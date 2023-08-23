import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase/Config';



export const ordersLoader = async () => {
  const storeId = import.meta.env.VITE_SUPABASE_STORE_ID;
  const { data: orders, error } = await supabase
    .from('order')
    .select('*,orderItem(*,product(*))')
    .eq('storeId', storeId)
    .order('createdAt', { ascending: false });

  if (error) return toast.error(error.message || 'something went wrong');

  return orders;
};
