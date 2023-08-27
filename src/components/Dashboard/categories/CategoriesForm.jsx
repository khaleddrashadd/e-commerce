import { Trash } from 'lucide-react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFetcher } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@/components/ui/form';
import { AlertModal } from '@/components/Dashboard/Modals';
import { alertModalActions } from '@/redux/slices/alert-modal-slice';
import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import InputField from '@/components/ui/InputField';
import { Separator } from '@/components/ui/separator';
import TextAreaField from '@/components/ui/TextAreaField';

const schema = z.object({
  name: z.string().trim().nonempty({ message: 'Name is required.' }),
  description: z.string().trim().nonempty({
    message: 'Description is required.',
  }),
});

const CategoriesForm = ({ category }) => {
  const fetcher = useFetcher();
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.alertModal);

  const title = category ? 'Edit category' : 'Create category';
  const description = category ? 'Edit a category.' : 'Add a new category';
  const action = category ? 'Save changes' : 'Create';

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: category?.name || '',
      description: category?.description || '',
    },
  });

  const onDelete = () => {
    fetcher.submit(null, { method: 'DELETE' });

    dispatch(alertModalActions.closeModal());
  };

  const onSubmit = (data) => {
    if (!category) {
      fetcher.submit(data, { method: 'POST' });
      return;
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
        {category && (
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
      <div className="flex max-sm:justify-center">
        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-8">
            <InputField
              control={methods.control}
              disabled={fetcher.state !== 'idle'}
              placeholder="Category name"
              name="name"
              title="Name"
            />
            <TextAreaField
              name="description"
              control={methods.control}
              disabled={fetcher.state !== 'idle'}
              placeholder="Add a description"
              title="Description"
              maxLength={40}
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

export default CategoriesForm;
