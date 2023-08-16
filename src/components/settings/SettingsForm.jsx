import { Trash } from 'lucide-react';
import { Button } from '../ui/button';
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
import { Input } from '../ui/input';
import { useFetcher } from 'react-router-dom';
import AlertModal from '../Modals/AlertModal';
import { useDispatch, useSelector } from 'react-redux';
import { alertModalActions } from '../../redux/slices/alert-modal-slice';

const schema = z.object({
  name: z.string().trim().nonempty({ message: 'Name is required' }),
});

const SettingsForm = ({ store }) => {
  const fetcher = useFetcher();
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.alertModal);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: store?.name,
    },
  });

  const onDelete = () => {
    fetcher.submit(null, { method: 'DELETE' });

    dispatch(alertModalActions.closeModal());
  };

  const onSubmit = (data) => {
    console.log(data, 'bill form');

    fetcher.submit(data, { method: 'PATCH' });
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => dispatch(alertModalActions.closeModal())}
        onConfirm={onDelete}
      />
      <div className="flex items-center justify-between">
        <Heading
          title="Settings"
          description="Mange store preferences"
        />
        <Button
          variant="destructive"
          size="icon"
          disabled={fetcher.state !== 'idle'}
          onClick={() => dispatch(alertModalActions.openModal())}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <div className="grid grid-cols-3">
        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-8">
            <FormField
              control={methods.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Store name"
                      disabled={fetcher.state !== 'idle'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={fetcher.state !== 'idle'}>
              Save changes
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default SettingsForm;
