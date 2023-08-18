import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/Dashboard/supabase/Config';

export const sizeLoader = async ({ params: { sizeId } }) => {
  if (sizeId === 'new') return null;

  const { data: size, error } = await supabase
    .from('size')
    .select()
    .eq('id', sizeId)
    .limit(1)
    .single();

  if (error) return toast.error(error.message || 'something went wrong');

  return size;
};
