import { Button } from '@/components/ui/Button';
import { Minus, Plus, Trash } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../redux/slices/cart-slice';

const CartControl = ({ product }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const item = items.find((item) => item.id === product.id);

  const onDecrease = () => {
    dispatch(cartActions.removeFromCart(product.id));
  };

  const onIncrease = () => {
    dispatch(
      cartActions.addToCart({
        ...product,
        quantity: 1,
        total: product.price,
      })
    );
  };

  const onRemove = () => {
    dispatch(cartActions.removeProductFromCart(product.id));
  };

  if (!item) return null;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <span className="text-gray-800 font-semibold">${item?.total}</span>
        <span className="text-gray-800 font-semibold">
          {item?.quantity} item
        </span>
      </div>
      <div className="flex items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="rounded-full p-2 aspect-square"
            onClick={onIncrease}>
            <Plus size={22} />
          </Button>
          <span>{item?.quantity}</span>
          <Button
            variant="outline"
            className="rounded-full p-2 aspect-square"
            onClick={onDecrease}>
            <Minus size={22} />
          </Button>
        </div>
        <Button
          variant="destructive"
          className="rounded-full p-2 aspect-square"
          onClick={onRemove}>
          <Trash size={22} />
        </Button>
      </div>
    </div>
  );
};
export default CartControl;
