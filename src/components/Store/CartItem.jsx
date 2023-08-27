import { Trash } from 'lucide-react';

import Currency from '@/components/ui/currency';
import { useDispatch } from 'react-redux';
import { cartActions } from '@/redux/slices/cart-slice';
import { Button } from '@/components/ui/button';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const onRemove = () => {
    dispatch(cartActions.removeProductFromCart(item.id));
  };
  return (
    <li className="flex lg:flex-row gap-4 flex-col py-6 border-b justify-between items-center">
      <div className="h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <img
          src={item.image}
          alt="product cart image"
          className="object-cover object-center"
        />
      </div>
      <div className="flex justify-between my-4 lg:my-0">
        <p className="flex-1 text-2xl font-semibold dark:text-white text-black">
          {item.name}
        </p>
      </div>
      <div className="px-4 flex">
        <div className="mt-1 flex text-sm h-fit gap-4">
          <p className="text-gray-500 dark:text-gray-200 border-x p-3 dark:border-gray-600">
            Quantity: {item.quantity}
          </p>
          <p className="text-gray-500 dark:text-gray-200">
            Color:{' '}
            <span
              className="rounded-full h-4 m-1"
              style={{ backgroundColor: item.color, display: 'block' }}
            />
          </p>
          <p className="ml-4 border-gray-200 dark:border-gray-500 border-x p-3 dark:text-gray-200 text-gray-500">
            Size: {item.size}
          </p>
          <span className="border-r p-2 h-fit">
            <Currency value={item.price} />
          </span>
          <div className="absolutse z-10 right-0 top-0">
            <Button
              className="aspect-square rounded-full p-0"
              variant="destructive"
              onClick={onRemove}>
              <Trash size={15} />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
