import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase/Config';


export const sizesLoader = async () => {
  const storeId = import.meta.env.VITE_SUPABASE_STORE_ID;
  const { data: sizes, error } = await supabase
    .from('size')
    .select()
    .eq('storeId', storeId)
    .order('createdAt', { ascending: false });

  if (error) return toast.error(error.message || 'something went wrong');

  return sizes;
};
