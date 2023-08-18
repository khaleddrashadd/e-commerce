import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/Dashboard/supabase/Config';

export const categoriesLoader = async ({ params: { storeId } }) => {
  const { data: categories, error } = await supabase
    .from('category')
    .select('*,billboard(*)')
    .eq('storeId', storeId)
    .order('createdAt', { ascending: false });

  if (error) return toast.error(error.message || 'something went wrong');

  return categories;
};
