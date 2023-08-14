import { supabase } from '../../supabase/Config';
import { redirect } from 'react-router-dom';

export const storeLoader = async ({ params: { storeId } }) => {

  const { data: store } = await supabase
    .from('store')
    .select()
    .eq('id', storeId)
    .limit(1)
    .single();

  if (!store) {
    return redirect('/admin');
  }
  return store;
};
