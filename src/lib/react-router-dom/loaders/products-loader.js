import { toast } from 'react-hot-toast';
import { supabase } from '../../supabase/Config';

export const productsLoader = async ({ params: { storeId } }) => {
  const { data: products, error } = await supabase
    .from('product')
    .select('*,category(*),color(*),size(*)')
    .eq('storeId', storeId)
    .order('createdAt', { ascending: false });

  if (error) return toast.error(error.message || 'something went wrong');
  console.log(products);
  return products;
};
