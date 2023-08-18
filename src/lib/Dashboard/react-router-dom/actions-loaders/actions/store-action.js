import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/Dashboard/supabase/Config';
import { redirect } from 'react-router-dom';

const storeAction = async ({ request, params }) => {
  const method = await request.method;

  switch (method) {
    case 'PATCH': {
      const formData = await request.formData();
      const newStoreName = formData.get('name');

      const { store, error } = await supabase
        .from('store')
        .update({ name: newStoreName })
        .eq('id', params.storeId)
        .select()
        .single();
      if (error) return toast.error(error.message || 'Failed to update store');

      toast.success('Store name updated successfully');
      return { store };
    }
    case 'DELETE': {
      const { error } = await supabase
        .from('store')
        .delete()
        .eq('id', params.storeId);
      if (error) return toast.error(error.message || 'Failed to delete store');

      toast.success('Store deleted successfully');
      return redirect('/admin');
    }
    default:
      return null;
  }
};
export default storeAction;
