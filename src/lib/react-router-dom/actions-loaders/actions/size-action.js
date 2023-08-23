import { toast } from 'react-hot-toast';
import { redirect } from 'react-router-dom';
import { supabase } from '@/lib/supabase/Config';

export const sizeAction = async ({ request, params }) => {
  const storeId = import.meta.env.VITE_SUPABASE_STORE_ID;
  const method = await request.method;
  const data = await request.formData();
  const name = data.get('name');
  const value = data.get('value');
  const id = data.get('sizeId');
  const categoryId = data.get('categoryId');
  const sizeId = params.sizeId !== 'sizeId' ? params.sizeId : id;

  if (method === 'POST') {
    const { error } = await supabase
      .from('size')
      .insert({
        name,
        value,
        storeId,
        categoryId,
      })
      .select()
      .single();
    if (error) return toast.error(error.message || 'something went wrong');
    toast.success('Size created successfully');

    return redirect(`/admin/sizes`);
  }
  if (method === 'PATCH') {
    const { error } = await supabase
      .from('size')
      .update({
        name,
        value,
        categoryId,
      })
      .eq('id', sizeId)
      .select()
      .single();
    if (error) return toast.error(error.message || 'something went wrong');
    toast.success('Size updated successfully');
    return redirect(`/admin/sizes`);
  }

  if (method === 'DELETE') {
    const { error } = await supabase.from('size').delete().eq('id', sizeId);
    if (error) return toast.error(error.message || 'something went wrong');
    toast.success('Size deleted successfully');
    return redirect(`/admin/sizes`);
  }

  return null;
};
