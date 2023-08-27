import { toast } from 'react-hot-toast';
import { supabase } from './Config';
import { v4 as uuid } from 'uuid';
import getImagePath from '@/utils/getImagePath';

export const addImagetodb = async (endpoint, imageblobUrl) => {
  const res = await fetch(imageblobUrl);
  const imageFile = await res.blob();

  const {
    data: { path },
    error,
  } = await supabase.storage
    .from('e-commerce')
    .upload(`${endpoint}/${uuid()}`, imageFile);
  if (error) return toast.error(error.message || 'something went wrong');
  return path;
};

export const deleteImageFromDb = async (imageDataUrl) => {
  const { error } = await supabase.storage
    .from('e-commerce')
    .remove(getImagePath(imageDataUrl));
  if (error) return toast.error(error.message || 'something went wrong');
};
