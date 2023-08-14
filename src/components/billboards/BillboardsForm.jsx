import { Trash } from 'lucide-react';
import { Button } from '../ui/Button';
import Heading from '../ui/Heading';
import { Separator } from '@/components/ui/Separator';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/Input';
import { useFetcher } from 'react-router-dom';
import AlertModal from '../Modals/AlertModal';
import { useDispatch, useSelector } from 'react-redux';
import { alertModalActions } from '../../redux/slices/alert-modal-slice';
import ImageUpload from '../ui/ImageUpload';
import { supabase } from '../../lib/supabase/Config';
import { toast } from 'react-hot-toast';

const schema = z.object({
  label: z.string().trim().nonempty(),
  imageUrl: z.string().trim().nonempty(),
});

const BillboardsForm = ({ billboard }) => {
  const fetcher = useFetcher();
  const dispatch = useDispatch();
  const { isOpen } = useSelector(state => state.alertModal);

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

  const onSubmit = data => {
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
        isLoading={fetcher.state === 'submitting'}
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
            disabled={fetcher.state === 'submitting'}
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
                      onChange={url => field.onChange(url)}
                      onRemove={path => onRemoveImage(path, field)}
                      disabled={fetcher.state === 'submitting'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Label</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Billboard label"
                      disabled={fetcher.state === 'submitting'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={fetcher.state === 'submitting'}>
              {action}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default BillboardsForm;
