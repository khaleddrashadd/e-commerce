import { toast } from 'react-hot-toast';
import { redirect } from 'react-router-dom';
import { supabase } from '@/lib/supabase/Config';
import getImageUrl from '@/utils/getImageUrl';
import {
  addImagetodb,
  deleteImageFromDb,
} from '@/lib/supabase/supbaseUtils';

export const billboardAction = async ({ request, params }) => {
  const method = await request.method;
  const data = await request.formData();
  const name = data.get('name');
  const imageDataUrl = data.get('imageUrl');
  const id = data.get('billboardId');
  const { storeId } = params;

  const billboardId =
    params.billboardId !== 'billboardId' ? params.billboardId : id;

  if (method === 'POST') {
    const imagepath = await addImagetodb('billboard', imageDataUrl);

    const imageUrl = getImageUrl(imagepath);
    const { error } = await supabase
      .from('billboard')
      .insert({
        name,
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
    let imageUrl = imageDataUrl;

    if (imageDataUrl) {
      const imagepath = await addImagetodb('billboard', imageDataUrl);
      imageUrl = getImageUrl(imagepath);
    }

    const { error } = await supabase
      .from('billboard')
      .update({
        name,
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
    deleteImageFromDb(imageDataUrl);
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
