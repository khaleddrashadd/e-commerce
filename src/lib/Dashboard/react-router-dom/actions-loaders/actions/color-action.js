import { toast } from 'react-hot-toast';
import { redirect } from 'react-router-dom';
import { supabase } from '@/lib/Dashboard/supabase/Config';

export const colorAction = async ({ request, params }) => {
  const method = await request.method;
  const data = await request.formData();
  const name = data.get('name');
  const value = data.get('value');
  const { storeId } = params;
  const id = data.get('colorId');
  const colorId = params.colorId !== 'colorId' ? params.colorId : id;

  if (method === 'POST') {
    const { error } = await supabase
      .from('color')
      .insert({
        name,
        value,
        storeId,
      })
      .select()
      .single();
    if (error) return toast.error(error.message || 'something went wrong');
    toast.success('Color created successfully');

    return redirect(`/admin/${storeId}/colors`);
  }
  if (method === 'PATCH') {
    const { error } = await supabase
      .from('color')
      .update({
        name,
        value,
      })
      .eq('id', colorId)
      .select()
      .single();
    if (error) return toast.error(error.message || 'something went wrong');
    toast.success('Color updated successfully');
    return redirect(`/admin/${storeId}/colors`);
  }

  if (method === 'DELETE') {
    const { error } = await supabase
      .from('color')
      .delete()
      .eq('id', colorId);
    if (error) return toast.error(error.message || 'something went wrong');
    toast.success('Color deleted successfully');
    return redirect(`/admin/${storeId}/colors`);
  }

  return null;
};
