import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase/Config';


const productsLoaderHelper = async ( query) => {
  const storeId = import.meta.env.VITE_SUPABASE_STORE_ID;
  const isFeatured = query?.isFeatured;
  const archived = query?.archived;

  const productsQuery = supabase
    .from('product')
    .select('*,category(*),color(*),size(*)')
    .eq('storeId', storeId);

  const { data: products, error } = await (isFeatured
    ? productsQuery
        .eq('isFeatured', isFeatured).eq('archived', archived)
        .order('createdAt', { ascending: false })
    : productsQuery.order('createdAt', { ascending: false }));

  if (error) return toast.error(error.message || 'something went wrong');
  return products;
};
export default productsLoaderHelper;
