import { toast } from 'react-hot-toast';
import { supabase } from '../../supabase/Config';

export const billboardLoader = async ({ params: { billboardId } }) => {
  if (billboardId === 'new') return null;

  const { data: billboard, error } = await supabase
    .from('billboard')
    .select()
    .eq('id', billboardId)
    .limit(1)
    .single();

  if (error) return toast.error(error.message || 'something went wrong');

  return billboard;
};
