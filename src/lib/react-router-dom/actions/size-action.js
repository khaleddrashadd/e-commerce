import { toast } from 'react-hot-toast';
import { redirect } from 'react-router-dom';
import { supabase } from '../../supabase/Config';

export const sizeAction = async ({ request, params }) => {
  const method = await request.method;
  const data = await request.formData();
  const name = data.get('name');
  const value = data.get('value');
  const { storeId } = params;
  const id = data.get('sizeId');
  const sizeId = params.sizeId !== 'sizeId' ? params.sizeId : id;

  if (method === 'POST') {
    const { error } = await supabase
      .from('size')
      .insert({
        name,
        value,
        storeId,
      })
      .select()
      .single();
    if (error) return toast.error(error.message || 'something went wrong');
    toast.success('Size created successfully');

    return redirect(`/admin/${storeId}/sizes`);
  }
  if (method === 'PATCH') {
    const { error } = await supabase
      .from('size')
      .update({
        name,
        value,
      })
      .eq('id', sizeId)
      .select()
      .single();
    if (error) return toast.error(error.message || 'something went wrong');
    toast.success('Size updated successfully');
    return redirect(`/admin/${storeId}/sizes`);
  }

  if (method === 'DELETE') {
    const { error } = await supabase
      .from('size')
      .delete()
      .eq('id', sizeId);
    if (error) return toast.error(error.message || 'something went wrong');
    toast.success('Size deleted successfully');
    return redirect(`/admin/${storeId}/sizes`);
  }

  return null;
};
