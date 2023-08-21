import { supabase } from '@/lib/supabase/Config';
import { redirect } from 'react-router-dom';

export const storeLoader = async () => {
  const storeId = import.meta.env.VITE_SUPABASE_STORE_ID;
  const { data: store } = await supabase
    .from('store')
    .select('*,category(*),size(*),color(*)')
    .eq('id', storeId)
    .limit(1)
    .single();

  if (!store) {
    return redirect('/admin');
  }
  return store;
};
