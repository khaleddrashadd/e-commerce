import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFetcher } from 'react-router-dom';
import { supabase } from '../../lib/supabase/Config';
import { useAuth } from '@clerk/clerk-react';

import Modal from '../ui/Modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { toast } from 'react-hot-toast';
import { storeModalActions } from '../../redux/slices/store-modal-slice';
import { useDispatch } from 'react-redux';

const StoreModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const { userId } = useAuth();

  const schema = z.object({
    storeName: z.string().trim().nonempty(),
  });

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      storeName: '',
    },
  });

  const fetcher = useFetcher();

  const onSubmit = data => {
    fetcher.submit(
      {
        ...data,
        userId,
      },
      { method: 'POST' }
    );
    dispatch(storeModalActions.closeModal());
  };

  return (
    <Modal
      title="Create a store"
      description="Add a new store to manage products and category."
      onClose={onClose}
      isOpen={isOpen}>
      <div>
        <div className="space-y-4 py-2 pb-6">
          <Form {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <FormField
                control={methods.control}
                name="storeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your store name"
                        {...field}
                        name="storeName"
                        type="text"
                        disabled={fetcher.state === 'submitting'}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-x-2 pt-6 flex items-center justify-end">
                <Button
                  variant="outline"
                  type="button"
                  disabled={fetcher.state === 'submitting'}
                  onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={fetcher.state === 'submitting'}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export const action = async ({ request }) => {
  const data = await request.formData();
  const storeName = data.get('storeName');
  const userId = data.get('userId');
  if (!userId) {
    toast.error('Unauthorized 401');
  }
  if (!storeName) {
    toast.error('Store name is required 400');
  }
  const { data: store, error } = await supabase
    .from('store')
    .insert({
      name: storeName,
      userId: userId,
    })
    .select()
    .limit(1)
    .single();

  if (error) {
    toast.error('something went wrong 500');
  }
  toast.success('Store created successfully');
  window.location.assign(`/admin/${store.id}`);

  return store;
};

export default StoreModal;
