import { ImagePlus, Trash } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Label } from './label';
import { supabase } from '../../lib/supabase/Config';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-hot-toast';
import getImageUrl from '../../utils/getImageUrl';
import { useState } from 'react';

const ImageUpload = ({ disabled, onChange, onRemove, value }) => {
  const [imagePath, setImagePath] = useState('');
  const onUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);

    const {
      data: { path },
      error,
    } = await supabase.storage
      .from('e-commerce')
      .upload(`billboard/${uuid()}`, formData);

    if (error) {
      return toast.error(error.message || 'Error uploading image');
    }
    setImagePath(path);
    const url = getImageUrl(path);
    url && onChange(url);
  };
  return (
    <div>
      <div className="wb-4 flex items-center gap-4">
        {value.map(url => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="absolute z-10 top-2 right-2">
              <Button
                onClick={() => onRemove(imagePath)}
                type="button"
                variant="destructive"
                size="icon">
                <Trash size={16} />
              </Button>
            </div>
            <img
              src={url}
              alt="billboard image"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="secondary"
        disabled={disabled}>
        <Label
          htmlFor="picture"
          className="w-full h-full flex items-center text-muted-foreground">
          <ImagePlus
            size={16}
            className="mr-2"
          />
          Upload an image
        </Label>
      </Button>
      <Input
        id="picture"
        type="file"
        name="img"
        accept="image/*"
        className="hidden"
        onChange={onUpload}
        disabled={disabled}
      />
    </div>
  );
};
export default ImageUpload;
