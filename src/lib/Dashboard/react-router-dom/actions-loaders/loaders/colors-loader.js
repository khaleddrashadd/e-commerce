import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/Dashboard/supabase/Config';

export const colorsLoader = async ({ params: { storeId } }) => {
  const { data: colors, error } = await supabase
    .from('color')
    .select()
    .eq('storeId', storeId)
    .order('createdAt', { ascending: false });

  if (error) return toast.error(error.message || 'something went wrong');

  return colors;
};
