import Currency from '@/components/ui/Currency';
import { Form } from '@/components/ui/form';
import SelectField from '@/components/ui/SelectField';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '@/redux/slices/cart-slice';
import CartControl from './CartControl';
import { toast } from 'react-hot-toast';

const schema = z.object({
  quantity: z.coerce.number().min(1),
});

const Info = ({ data, variant,isLoading }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: { quantity: 1 },
  });
  const options = Array.from({ length: data?.quantity }, (_, i) => {
    return { name: i + 1, id: i + 1 };
  });

  const formattedProduct = {
    id: data?.id,
    name: data?.name,
    price: data?.price,
    category: data?.category.name,
    size: data?.size?.name,
    color: data?.color.value,
    image: data?.imagesUrl[0],
    quantity: data?.quantity,
  };
  const onSubmit = ({ quantity }) => {
    const item = items.find((item) => item.id === data?.id);
    if (quantity + item?.quantity > data?.quantity) {
      toast.error('Quantity is not available');
      return;
    }
    const product = {
      ...formattedProduct,
      quantity: quantity,
      total: data?.price * quantity,
    };
    dispatch(cartActions.addToCart(product));
  };
  return (
    <Form
      {...methods}
      className="flex flex-col gap-6 items-center font-urbanist">
      <div className="flex flex-col items-center gap-2">
        <h2
          className={`${
            variant === 'card'
              ? 'text-lg font-semibold dark:text-white'
              : 'lg:text-3xl sm:text-2xl font-bold dark:text-white text-gray-800'
          }`}>
          {data?.name}
        </h2>
        <h4 className="font-semibold text-sm text-gray-400">
          {data?.category.name}
        </h4>
        <div
          className={`${
            variant === 'card'
              ? 'font-semibold text-lg dark:text-gray-300'
              : 'sm:text-lg lg:text-2xl text-neutral-700 dark:text-gray-300'
          }`}>
          <Currency value={data?.price} />
        </div>
        <div className={variant === 'card' ? 'hidden' : 'flex gap-2 flex-col'}>
          <div className="flex items-center gap-x-3">
            <h3 className="font-semibold dark:text-white text-black">Size:</h3>
            <span>{data?.size?.name}</span>
          </div>
          <div className="flex items-center gap-x-3">
            <h3 className="font-semibold text-black dark:text-white">Color:</h3>
            <span
              className="h-6 w-6 rounded-full border border-neutral-300"
              style={{ backgroundColor: data?.color.value }}
            />
          </div>
        </div>
        <SelectField
          control={methods.control}
          placeholder="Qty"
          name="quantity"
          title="Quantity"
          position="item-aligned"
          data={options}
          disabled={isLoading}
        />
        <CartControl
          product={formattedProduct}
          onClick={methods.handleSubmit(onSubmit)}
          variant={variant}
          isLoading={isLoading}
        />
      </div>
    </Form>
  );
};
export default Info;
