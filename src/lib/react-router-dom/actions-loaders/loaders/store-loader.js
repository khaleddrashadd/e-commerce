import { supabase } from '@/lib/supabase/Config';
import { redirect } from 'react-router-dom';

export const storeLoader = async () => {
  const storeId = import.meta.env.VITE_SUPABASE_STORE_ID;
  const { data: store } = await supabase
    .from('store')
    .select(
      '*,category(*),product(*),size(*,category(*)),color(*,category(*)),order(*,orderItem(*,product(*,category(*),size(*,category(*)),color(*,category(*)))))'
    )
    .eq('id', storeId)
    .limit(1)
    .single();

  if (!store) {
    return redirect('/admin');
  }
  return store;
};
