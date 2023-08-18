import { Trash } from 'lucide-react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useFetcher } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import Heading from '../ui/Heading';
import { Button } from '../ui/Button';
import InputField from '../ui/InputField';
import { Separator } from '@/components/ui/Separator';
import { deleteImageFromDb } from '../../lib/supabase/supbaseUtils';

const schema = z.object({
  name: z.string().trim().nonempty({ message: 'Label is required' }),
  imageUrl: z.union([
    z.string().url({ message: 'Image is required' }),
    z.array(z.string().url({ message: 'Image is required' })),
  ]),
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
      name: billboard?.name || '',
      imageUrl: billboard?.imageUrl || '',
    },
  });

  const onDelete = () => {
    const formData = new FormData();
    formData.append('imageUrl', billboard.imageUrl);
    fetcher.submit(formData, { method: 'DELETE' });

    dispatch(alertModalActions.closeModal());
  };

  const onSubmit = (data) => {
    if (!billboard) {
      fetcher.submit(data, { method: 'POST' });
      return;
    }
    if (data.imageUrl !== billboard.imageUrl) {
      deleteImageFromDb(billboard.imageUrl);
      return fetcher.submit(data, { method: 'PATCH' });
    }
    fetcher.submit(data, { method: 'PATCH' });
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
              name="name"
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
