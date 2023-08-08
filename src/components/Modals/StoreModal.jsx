import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { storeModalActions } from '../../redux/slices/store-modal-slice';
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
import { useSelector, useDispatch } from 'react-redux';

const StoreModal = () => {
  const schema = z.object({
    storeName: z.string().trim().nonempty(),
  });

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      storeName: '',
    },
  });

  const dispatch = useDispatch();
  const { isOpen } = useSelector(state => state.storeModal);
  const onClose = () => {
    dispatch(storeModalActions.closeModal());
  };

  const onSubmit = async data => {
    console.log(data);
    //TODO: Add store to database
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-x-2 pt-6 flex items-center justify-end">
                <Button
                  variant="outline"
                  onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
export default StoreModal;
