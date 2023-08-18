import { Trash } from 'lucide-react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useFetcher } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Form } from '../ui/form';
import AlertModal from '../Modals/AlertModal';
import { alertModalActions } from '../../redux/slices/alert-modal-slice';
import Heading from '../ui/Heading';
import { Button } from '../ui/Button';
import InputField from '../ui/InputField';
import SelectField from '../ui/SelectField';
import { Separator } from '@/components/ui/Separator';

const schema = z.object({
  name: z.string().trim().nonempty({ message: 'Name is required.' }),
  billboardId: z.string().trim().nonempty({
    message: 'Billboard is required.',
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
      billboardId: category?.billboardId || '',
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

  useEffect(() => {
    if (fetcher.state !== 'idle' || fetcher.data) return;
    fetcher.load('../../billboards');
  }, [fetcher]);

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
      <div className="grid grid-cols-3">
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
            <SelectField
              control={methods.control}
              disabled={fetcher.state !== 'idle'}
              placeholder="Select a billboard"
              name="billboardId"
              title="Billboard"
              data={fetcher.data}
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
