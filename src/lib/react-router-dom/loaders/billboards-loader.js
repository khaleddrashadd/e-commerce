import { toast } from 'react-hot-toast';
import { supabase } from '../../supabase/Config';

export const billboardsLoader = async ({ params: { storeId } }) => {
  const { data: billboard, error } = await supabase
    .from('billboard')
    .select()
    .eq('storeId', storeId)
    .order('createdAt', { ascending: false });

  if (error) return toast.error(error.message || 'something went wrong');

  return billboard;
};
