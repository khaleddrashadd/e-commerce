import { Button } from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import { useOutletContext } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { supabase } from '../../lib/supabase/Config';

const Summary = () => {
  const {browserId} = useOutletContext();
  const { items, totalPrice, totalQuantity } = useSelector(
    (state) => state.cart
  );
  
  const onCheckout = async () => {
    const productIds = items.map((item) => item.id);
    const data = JSON.stringify({
      productIds,
      items,
      totalPrice,
      totalQuantity,
      browserId
    });
    const { data: response } = await supabase.functions.invoke(
      'stripe',
      { body: data },
      { method: 'POST' }
    );
    window.location = response.url;
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
