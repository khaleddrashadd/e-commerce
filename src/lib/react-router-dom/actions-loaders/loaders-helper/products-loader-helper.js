import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase/Config';

const productsLoaderHelper = async (storeId, query) => {
  const isFeatured = query?.isFeatured;

  const productsQuery = supabase
    .from('product')
    .select('*,category(*),color(*),size(*)')
    .eq('storeId', storeId);

  const { data: products, error } = await (isFeatured
    ? productsQuery
        .eq('isFeatured', isFeatured)
        .order('createdAt', { ascending: false })
    : productsQuery.order('createdAt', { ascending: false }));

  if (error) return toast.error(error.message || 'something went wrong');
  return products;
};
export default productsLoaderHelper;
