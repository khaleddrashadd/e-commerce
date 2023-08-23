import { toast } from 'react-hot-toast';
import { redirect } from 'react-router-dom';
import { supabase } from '@/lib/supabase/Config';

export const colorAction = async ({ request, params }) => {
  const storeId = import.meta.env.VITE_SUPABASE_STORE_ID;
  const method = await request.method;
  const data = await request.formData();
  const name = data.get('name');
  const value = data.get('value');
  const id = data.get('colorId');
  const categoryId = data.get('categoryId');

  const colorId = params.colorId !== 'colorId' ? params.colorId : id;

  if (method === 'POST') {
    const { error } = await supabase
      .from('color')
      .insert({
        name,
        value,
        storeId,
        categoryId,
      })
      .select()
      .single();
    if (error) return toast.error(error.message || 'something went wrong');
    toast.success('Color created successfully');

    return redirect(`/admin/colors`);
  }
  if (method === 'PATCH') {
    const { error } = await supabase
      .from('color')
      .update({
        name,
        value,
        categoryId,
      })
      .eq('id', colorId)
      .select()
      .single();
    if (error) return toast.error(error.message || 'something went wrong');
    toast.success('Color updated successfully');
    return redirect(`/admin/colors`);
  }

  if (method === 'DELETE') {
    const { error } = await supabase.from('color').delete().eq('id', colorId);
    if (error) return toast.error(error.message || 'something went wrong');
    toast.success('Color deleted successfully');
    return redirect(`/admin/colors`);
  }

  return null;
};
