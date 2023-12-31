import { toast } from 'react-hot-toast';
import { redirect } from 'react-router-dom';
import { supabase } from '@/lib/supabase/Config';
import getImageUrl from '@/utils/getImageUrl';
import { addImagetodb, deleteImageFromDb } from '@/lib/supabase/supbaseUtils';

export const productAction = async ({ request, params }) => {
  const storeId = import.meta.env.VITE_SUPABASE_STORE_ID;

  const method = await request.method;
  const data = await request.formData();
  const {
    name,
    categoryId,
    colorId,
    imagesUrl: imagesDataUrl,
    isFeatured,
    archived,
    sizeId,
    price,
    quantity,
  } = Object.fromEntries(data.entries());
  const id = data.get('productId');

  const productId = params.productId !== 'productId' ? params.productId : id;

  if (method === 'POST') {
    const imagespath = imagesDataUrl
      .split(',')
      .map(async (image) => await addImagetodb('product', image));
    const imagesPath = await Promise.all(imagespath);

    const imagesUrl = imagesPath.map((val) => getImageUrl(val));
    const { error } = await supabase
      .from('product')
      .insert({
        name,
        categoryId,
        colorId,
        imagesUrl,
        isFeatured,
        archived,
        sizeId,
        price,
        storeId,
        quantity,
      })
      .select()
      .single();
    if (error) return toast.error(error.message || 'something went wrong');
    toast.success('Product created successfully');
    return redirect(`/admin/products`);
  }

  if (method === 'PATCH') {
    let imagesUrl = [];
    const isBlobUrl = (url) => {
      const blobUrlPattern = /^blob:/i;
      return blobUrlPattern.test(url);
    };

    for (const url of imagesDataUrl.split(',')) {
      if (isBlobUrl(url)) {
        const imagepath = await addImagetodb('product', url);
        imagesUrl.push(getImageUrl(imagepath));
      } else {
        imagesUrl.push(url);
      }
    }

    const { error } = await supabase
      .from('product')
      .update({
        name,
        imagesUrl,
        categoryId,
        colorId,
        isFeatured,
        archived,
        sizeId,
        price,
        quantity,
      })
      .eq('id', productId)
      .select()
      .single();
    if (error) return toast.error(error.message || 'something went wrong');
    toast.success('Product updated successfully');
    return redirect(`/admin/products`);
  }

  if (method === 'DELETE') {
    imagesDataUrl.split(',').forEach((image) => deleteImageFromDb(image));
    const { error } = await supabase
      .from('product')
      .delete()
      .eq('id', productId);
    if (error) return toast.error(error.message || 'something went wrong');
    toast.success('Product deleted successfully');
    return redirect(`/admin/products`);
  }

  return null;
};
