import { toast } from 'react-hot-toast';
import { redirect } from 'react-router-dom';
import { supabase } from '@/lib/supabase/Config';

export const categoryAction = async ({ request, params }) => {
  const storeId = import.meta.env.VITE_SUPABASE_STORE_ID;

  const method = await request.method;
  const data = await request.formData();
  const name = data.get('name');
  const description = data.get('description');
  const id = data.get('categoryId');
  const categoryId =
    params.categoryId !== 'categoryId' ? params.categoryId : id;

  if (method === 'POST') {
    const { error } = await supabase
      .from('category')
      .insert({
        name,
        storeId,
        description,
      })
      .select()
      .single();
    if (error) return toast.error(error.message || 'something went wrong');
    toast.success('Category created successfully');

    return redirect(`/admin/categories`);
  }
  if (method === 'PATCH') {
    const { error } = await supabase
      .from('category')
      .update({
        name,
        description,
      })
      .eq('id', categoryId)
      .select()
      .single();
    if (error) return toast.error(error.message || 'something went wrong');
    toast.success('Category updated successfully');
    return redirect(`/admin/categories`);
  }

  if (method === 'DELETE') {
    const { error } = await supabase
      .from('category')
      .delete()
      .eq('id', categoryId);
    if (error) return toast.error(error.message || 'something went wrong');
    toast.success('Category deleted successfully');
    return redirect(`/admin/categories`);
  }

  return null;
};
