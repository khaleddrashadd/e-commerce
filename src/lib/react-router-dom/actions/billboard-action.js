import { toast } from 'react-hot-toast';
import { supabase } from '../../supabase/Config';
import { redirect } from 'react-router-dom';

export const billboardAction = async ({ request, params }) => {
  const method = await request.method;
  const data = await request.formData();
  const label = data.get('label');
  const imageUrl = data.get('imageUrl');
  const id = data.get('billboardId');
  const { storeId } = params;
  const billboardId =
    params.billboardId !== 'billboardId' ? params.billboardId : id;


  if (method === 'POST') {
    const { data: billboard, error } = await supabase
      .from('billboard')
      .insert({
        label,
        imageUrl,
        storeId,
      })
      .select()
      .single();
    if (error) return toast.error(error.message || 'something went wrong');
    toast.success('Billboard created successfully');

    return redirect(`/admin/${storeId}/billboards`);
  }
  if (method === 'PATCH') {
    const { data: billboard, error } = await supabase
      .from('billboard')
      .update({
        label,
        imageUrl,
      })
      .eq('id', billboardId)
      .select()
      .single();
    if (error) return toast.error(error.message || 'something went wrong');
    toast.success('Billboard updated successfully');
    return redirect(`/admin/${storeId}/billboards`);
  }

  if (method === 'DELETE') {
    const { error } = await supabase
      .from('billboard')
      .delete()
      .eq('id', billboardId);
    if (error) return toast.error(error.message || 'something went wrong');
    toast.success('Billboard deleted successfully');
    return redirect(`/admin/${storeId}/billboards`);
  }

  return null;
};
