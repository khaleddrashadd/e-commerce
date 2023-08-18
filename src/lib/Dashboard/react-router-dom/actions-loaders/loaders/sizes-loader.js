import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/Dashboard/supabase/Config';

export const sizesLoader = async ({ params: { storeId } }) => {
  const { data: sizes, error } = await supabase
    .from('size')
    .select()
    .eq('storeId', storeId)
    .order('createdAt', { ascending: false });

  if (error) return toast.error(error.message || 'something went wrong');

  return sizes;
};
