import { ImagePlus, Trash } from 'lucide-react';
import { Button } from './Button';
import { Input } from './input';
import { Label } from './label';
import { deleteImageFromDb } from '@/lib/supabase/supbaseUtils';

const ImageUpload = ({ disabled, onChange, value, multiple }) => {
  const onUpload = async (e) => {
    const files = Array.from(e.target.files);
    const filesUrl = files.map((file) => URL.createObjectURL(file));
    onChange([...value,...filesUrl]);
  };

  const onRemoveImage = (url) => {
    if (!multiple) return onChange('');
    deleteImageFromDb(url);
    const filteredValue =value.filter((item) => item !== url);
    onChange(filteredValue);
  };
  return (
    <div>
      <div className="mb-4 flex flex-col gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="absolute z-10 top-2 right-2">
              <Button
                onClick={() => onRemoveImage(url)}
                type="button"
                variant="destructive"
                size="icon">
                <Trash size={16} />
              </Button>
            </div>
            <img
              src={url}
              alt="product image"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {(value.length === 0 || multiple) && (
        <Button
          type="button"
          variant="secondary"
          disabled={disabled}>
          <Label
            htmlFor="picture"
            className="w-full h-full flex items-center cursor-pointer text-muted-foreground">
            <ImagePlus
              size={16}
              className="mr-2"
            />
            Upload an image
          </Label>
        </Button>
      )}
      <Input
        id="picture"
        type="file"
        name="img"
        accept="image/*"
        className="hidden"
        onChange={onUpload}
        disabled={disabled}
        multiple={multiple}
      />
    </div>
  );
};
export default ImageUpload;
