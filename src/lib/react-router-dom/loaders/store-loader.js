import { toast } from 'react-hot-toast';
import { supabase } from '../../supabase/Config';
import { redirect } from 'react-router-dom';

export const loader = async ({ params: { storeId } }) => {
  const { data: store, error } = await supabase
    .from('store')
    .select()
    .eq('id', storeId)
    .limit(1)
    .single();

  if (error) {
    toast.error(error.message || 'something went wrong 500');
  }

  if (!store) {
    return redirect('/admin');
  }
  return store;
};
