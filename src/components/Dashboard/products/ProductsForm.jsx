import { Trash } from 'lucide-react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useFetcher, useRouteLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AlertModal } from '@/components/Dashboard/Modals';
import { alertModalActions } from '@/redux/slices/alert-modal-slice';
import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import { Separator } from '@/components/ui/Separator';
import ImageUpload from '@/components/ui/ImageUpload';
import SelectField from '@/components/ui/SelectField';
import CheckboxField from '@/components/ui/CheckboxField';

const schema = z.object({
  name: z.string().nonempty({ message: 'Name is required.' }),
  imagesUrl: z.array(z.string().nonempty()).refine((arr) => arr.length > 0, {
    message: 'At least one image is required',
  }),

  price: z.coerce
    .number()
    .min(1)
    .refine((val) => val > 0, {
      message: 'Price must be greater than 0.',
    }),
  categoryId: z.string().nonempty({ message: 'Category is required.' }),
  colorId: z.string().nonempty({ message: 'Color is required.' }),
  sizeId: z.string().nonempty({ message: 'Size is required.' }),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  quantity: z.coerce
    .number()
    .min(1)
    .refine((val) => val > 0, {
      message: 'Price must be greater than 0.',
    }),
});

const ProductsForm = ({ product }) => {
  const fetcher = useFetcher();
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.alertModal);

  const title = product ? 'Edit product' : 'Create product';
  const description = product ? 'Edit a product.' : 'Add a new product';
  const action = product ? 'Save changes' : 'Create';
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: product?.name || '',
      imagesUrl: product?.imagesUrl || [],
      price: product?.price || 0,
      categoryId: product?.categoryId || '',
      colorId: product?.colorId || '',
      sizeId: product?.sizeId || '',
      isFeatured: product?.isFeatured || false,
      isArchived: product?.isArchived || false,
      quantity: product?.quantity || 1,
    },
  });

  const onDelete = () => {
    fetcher.submit({ imagesUrl: product.imagesUrl }, { method: 'DELETE' });

    dispatch(alertModalActions.closeModal());
  };

  const onSubmit = (data) => {
    if (!product) {
      fetcher.submit(data, { method: 'POST' });
      return;
    }
    fetcher.submit(data, { method: 'PATCH' });
  };

  const { category, color, size } = useRouteLoaderData('store');

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
        {product && (
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
      <div>
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormField
              control={methods.control}
              name="imagesUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? field.value : []}
                      onChange={(urls) => field.onChange(urls)}
                      disabled={fetcher.state !== 'idle'}
                      multiple
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
              <InputField
                control={methods.control}
                disabled={fetcher.state !== 'idle'}
                placeholder="Product name"
                name="name"
                title="Name"
                className=''
              />
              <InputField
                control={methods.control}
                disabled={fetcher.state !== 'idle'}
                placeholder="Product name"
                name="price"
                title="Price"
                type="number"
                min="1"
              />
              <InputField
                control={methods.control}
                disabled={fetcher.state !== 'idle'}
                placeholder="Product quantity"
                name="quantity"
                title="Quantity"
                type="number"
                min="1"
              />
              <SelectField
                control={methods.control}
                disabled={fetcher.state !== 'idle'}
                placeholder="Select a category"
                name="categoryId"
                title="Category"
                data={category}
              />
              <SelectField
                control={methods.control}
                disabled={fetcher.state !== 'idle'}
                placeholder="Select a size"
                name="sizeId"
                title="Size"
                data={size}
              />
              <SelectField
                control={methods.control}
                disabled={fetcher.state !== 'idle'}
                placeholder="Select a color"
                name="colorId"
                title="Color"
                data={color}
              />
              <CheckboxField
                control={methods.control}
                disabled={fetcher.state !== 'idle'}
                name="isFeatured"
                label="Featured"
                description="This product will appear on the home page"
              />
              <CheckboxField
                control={methods.control}
                disabled={fetcher.state !== 'idle'}
                name="isArchived"
                label="Archived"
                description="This product will not appear anywhere in the store."
              />
            </div>
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

export default ProductsForm;
