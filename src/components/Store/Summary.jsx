import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '@/redux/slices/cart-slice';

const Summary = () => {
  const [searchParams] = useSearchParams();
  const { items, totalPrice, totalQuantity } = useSelector(
    (state) => state.cart
  );
  console.log(totalPrice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      dispatch(cartActions.deleteCart());
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams]);

  const onCheckout = async () => {
    const productIds = items.map((item) => item.id);
    console.log(productIds);
  };

  return (
    <div className="flex-1 md:mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        onClick={onCheckout}
        disabled={totalQuantity === 0}
        className="w-full mt-6">
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
