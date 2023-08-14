import { toast } from 'react-hot-toast';
import { supabase } from '../../supabase/Config';

export const insertStoreAction = async ({ request }) => {
  const data = await request.formData();
  const storeName = data.get('storeName');
  const userId = data.get('userId');

  if (!userId) {
    toast.error('Unauthorized 401');
  }

  if (!storeName) {
    toast.error('Store name is required 400');
  }

  const { data: store, error } = await supabase
    .from('store')
    .insert({
      name: storeName,
      userId,
    })
    .select()
    .limit(1)
    .single();

  if (error) {
    toast.error('something went wrong 500');
  }
  toast.success('Store created successfully');
  window.location.assign(`/admin/${store.id}`);

  return store;
};
