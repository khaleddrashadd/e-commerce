import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase/Config';

const storeId = import.meta.env.VITE_SUPABASE_STORE_ID;

export const sizesLoader = async () => {
  const { data: sizes, error } = await supabase
    .from('size')
    .select()
    .eq('storeId', storeId)
    .order('createdAt', { ascending: false });

  if (error) return toast.error(error.message || 'something went wrong');

  return sizes;
};
