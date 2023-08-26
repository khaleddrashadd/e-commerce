import { useCookies } from 'react-cookie';
import { supabase } from '../lib/supabase/Config';
import { useState } from 'react';

const useUpdateCartDb = () => {
  const [cookies] = useCookies(['browserId']);
  const [isLoading, setIsLoading] = useState(false);

  if (!cookies.browserId) return null;

  const getCartDb = async () => {
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
      /* cart.itemsforeEach(item=>{
        item.quantity>
      }) */
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
  const deleteCart = async () => {
    await supabase.from('cart').delete().eq('browserId', cookies.browserId);
  };
  return { updateCartDb, getCartDb, isLoading, deleteCart };
};
export default useUpdateCartDb;
