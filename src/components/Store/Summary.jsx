import { Button } from '@/components/ui/button';
import Currency from '@/components/ui/Currency';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { supabase } from '@/lib/supabase/Config';
import { SignIn, useAuth } from '@clerk/clerk-react';

const Summary = () => {
  const { userId } = useAuth();
  const { browserId } = useOutletContext();
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
      browserId,
    });
    const { data: response } = await supabase.functions.invoke(
      'stripe',
      { body: data },
      {
        method: 'POST',
        headers: {
          mode: 'no-cors',
          'Access-Control-Allow-Origin': '*',
        },
      }
      );
      window.location = response.url;
    };

    if (!userId) return <SignIn />;
    return (
    <div className="flex-1 md:mt-16 rounded-lg bg-gray-50 dark:bg-gray-800 px-4 py-6 sm:p-6 lg:col-span-5 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white">
        Order summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900 dark:text-neutral-300">
            Order total
          </div>
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
