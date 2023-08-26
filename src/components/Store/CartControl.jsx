import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

import { Minus, Plus, Trash } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../redux/slices/cart-slice';
import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';

const CartControl = ({ product, onClick, variant }) => {
  const dispatch = useDispatch();
  const {isLoading} = useOutletContext();
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

  const isAvailable = item ? product.quantity > item.quantity : true;

  useEffect(() => {
    dispatch(cartActions.changeAvailability(isAvailable));
  }, [isAvailable]);

  return (
    <>
      <Button
        className={`${
          variant === 'card' ? 'rounded-lg self-stretch' : 'rounded-full'
        } mt-1 flex items-center gap-2`}
        disabled={isLoading || !isAvailable}
        onClick={onClick}>
        Add To Cart
        <ShoppingCart />
      </Button>
      {item && (
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
                disabled={isLoading || !isAvailable}
                onClick={onIncrease}>
                <Plus size={22} />
              </Button>
              <span>{item?.quantity}</span>
              <Button
                variant="outline"
                className="rounded-full p-2 aspect-square"
                disabled={isLoading}
                onClick={onDecrease}>
                <Minus size={22} />
              </Button>
            </div>
            <Button
              variant="destructive"
              className="rounded-full p-2 aspect-square"
              disabled={isLoading}
              onClick={onRemove}>
              <Trash size={22} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
export default CartControl;
