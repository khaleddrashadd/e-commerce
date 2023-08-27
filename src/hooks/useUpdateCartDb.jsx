import { useCookies } from 'react-cookie';
import { supabase } from '../lib/supabase/Config';
import { useState } from 'react';

const useUpdateCartDb = () => {
  const [cookies] = useCookies(['browserId']);
  const [isLoading, setIsLoading] = useState(false);

  
  const getCartDb = async () => {
    if (!cookies.browserId) return ;
    setIsLoading(true);
    const { data, error } = await supabase
      .from('cart')
      .select()
      .eq('browserId', cookies.browserId);
    setIsLoading(false);
    return { cartDb: data, err: error };
  };

  const updateCartDb = async (cart) => {
    setIsLoading(true);
    const { cartDb, err } = await getCartDb();
    setIsLoading(false);

    if (err) {
      return { data: null, error: err };
    }

    if (cartDb.length > 0) {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('cart')
        .update({
          browserId: cookies.browserId,
          cart: cart,
          expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
        })
        .eq('browserId', cookies.browserId)
        .select();
      setIsLoading(false);
      return { data, error: error };
    } else {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('cart')
        .insert({
          browserId: cookies.browserId,
          cart: cart,
          expiresAt: new Date().toISOString(),
        })
        .eq('browserId', cookies.browserId)
        .select();
      setIsLoading(false);
      return { data, error: error };
    }
  };
  return { updateCartDb, getCartDb, isLoading };
};
export default useUpdateCartDb;
