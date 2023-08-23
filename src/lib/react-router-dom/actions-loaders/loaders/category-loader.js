import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase/Config';

export const categoryLoader = async ({ params: { categoryId } }) => {
  if (categoryId === 'new') return null;

  const { data: category, error } = await supabase
    .from('category')
    .select()
    .eq('id', categoryId)
    .limit(1)
    .single();

  if (error) return toast.error(error.message || 'something went wrong');

  return category;
};
