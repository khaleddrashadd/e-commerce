import { Trash } from 'lucide-react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useFetcher } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import AlertModal from '../Modals/AlertModal';
import { alertModalActions } from '../../redux/slices/alert-modal-slice';
import ImageUpload from '../ui/ImageUpload';
import { supabase } from '../../lib/supabase/Config';
import Heading from '../ui/Heading';
import { Button } from '../ui/button';
import InputField from '../ui/InputField';
import { Separator } from '@/components/ui/Separator';

const schema = z.object({
  label: z.string().trim().nonempty({message: 'Label is required'}),
  imageUrl: z.string().trim().nonempty({message: 'Image is required'}),
});

const BillboardsForm = ({ billboard }) => {
  const fetcher = useFetcher();
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.alertModal);

  const title = billboard ? 'Edit billboard' : 'Create billboard';
  const description = billboard ? 'Edit a billboard.' : 'Add a new billboard';
  const action = billboard ? 'Save changes' : 'Create';

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      label: billboard?.label || '',
      imageUrl: billboard?.imageUrl || '',
    },
  });

  const onDelete = () => {
    fetcher.submit(null, { method: 'DELETE' });

    dispatch(alertModalActions.closeModal());
  };

  const onSubmit = (data) => {
    if (!billboard) {
      fetcher.submit(data, { method: 'POST' });
      return;
    }
    fetcher.submit(data, { method: 'PATCH' });
  };

  const onRemoveImage = async (path, field) => {
    if (!path) return;
    const { error } = await supabase.storage.from('e-commerce').remove([path]);
    if (error) return toast.error(error.message || 'Error removing image');
    toast.success('Image removed');
    field.onChange('');
  };
  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => dispatch(alertModalActions.closeModal())}
        onConfirm={onDelete}
        isLoading={fetcher.state !== 'idle'}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={title}
          description={description}
        />
        {billboard && (
          <Button
            variant="destructive"
            size="icon"
            disabled={fetcher.state !== 'idle'}
            onClick={() => dispatch(alertModalActions.openModal())}>
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <div className="grid grid-cols-3">
        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-8">
            <FormField
              control={methods.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Background image
                  </FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={(path) => onRemoveImage(path, field)}
                      disabled={fetcher.state !== 'idle'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <InputField
              control={methods.control}
              disabled={fetcher.state !== 'idle'}
              placeholder="Billboard label"
              name="label"
              title="Label"
            />

            <Button
              type="submit"
              disabled={fetcher.state !== 'idle'}>
              {action}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default BillboardsForm;
