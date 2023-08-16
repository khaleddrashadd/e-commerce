import { Trash } from 'lucide-react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useFetcher } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '../ui/form';
import AlertModal from '../Modals/AlertModal';
import { alertModalActions } from '../../redux/slices/alert-modal-slice';
import Heading from '../ui/Heading';
import { Button } from '../ui/button';
import InputField from '../ui/InputField';
import { Separator } from '@/components/ui/Separator';
import { SketchPicker } from 'react-color';

const schema = z.object({
  name: z.string().trim().nonempty({ message: 'Name is required.' }),
  value: z.string().trim().nonempty({
    message: 'Value is required.',
  }),
});

const ColorsForm = ({ color }) => {
  const fetcher = useFetcher();
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.alertModal);

  const title = color ? 'Edit color' : 'Create color';
  const description = color ? 'Edit a color.' : 'Add a new color';
  const action = color ? 'Save changes' : 'Create';

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: color?.name || '',
      value: color?.value || '',
    },
  });

  const onDelete = () => {
    fetcher.submit(null, { method: 'DELETE' });

    dispatch(alertModalActions.closeModal());
  };

  const onSubmit = (data) => {
    if (!color) {
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
        {color && (
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
              placeholder="Color name"
              name="name"
              title="Name"
            />
            <InputField
              control={methods.control}
              disabled={fetcher.state !== 'idle'}
              placeholder="Color value"
              name="value"
              title="Value"
              type="color"
              className='rounded-full w-20 h-20'
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

export default ColorsForm;
