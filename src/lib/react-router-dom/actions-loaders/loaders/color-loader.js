import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase/Config';

export const colorLoader = async ({ params: { colorId } }) => {
  if (colorId === 'new') return null;

  const { data: color, error } = await supabase
    .from('color')
    .select('*,category(*)')
    .eq('id', colorId)
    .limit(1)
    .single();

  if (error) return toast.error(error.message || 'something went wrong');

  return color;
};
