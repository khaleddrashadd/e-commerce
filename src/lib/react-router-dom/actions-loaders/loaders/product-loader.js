import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase/Config';

export const productLoader = async ({ params: { productId } }) => {
  if (productId === 'new') return null;

  const { data: product, error } = await supabase
    .from('product')
    .select()
    .eq('id', productId)
    .limit(1)
    .single();

  if (error) return toast.error(error.message || 'something went wrong');

  return product;
};
