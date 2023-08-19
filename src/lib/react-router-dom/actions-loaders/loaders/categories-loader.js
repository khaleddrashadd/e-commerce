import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase/Config';
const storeId = import.meta.env.VITE_SUPABASE_STORE_ID;
export const categoriesLoader = async () => {
  const { data: categories, error } = await supabase
    .from('category')
    .select('*,billboard(*)')
    .eq('storeId', storeId)
    .order('createdAt', { ascending: false });

  if (error) return toast.error(error.message || 'something went wrong');

  return categories;
};
