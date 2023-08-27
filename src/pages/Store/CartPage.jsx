import Container from '@/components/ui/Container';
import { useSelector } from 'react-redux';
import CartItem from '@/components/Store/CartItem';
import Summary from '@/components/Store/Summary';
import EmptyState from '@/components/ui/EmptyState';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
const CartPage = () => {
  const [searchParams] = useSearchParams();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams]);

  return (
    <Container>
      <h2 className="text-3xl font-bold text-black dark:text-white">
        Shopping Cart
      </h2>
      <div className="px-4 py-16 sm:px-6 lg:px-8 font-urbanist">
        <div className="lg:w-85/12">
          <div className="flex flex-col md:flex-row sm:gap-4 md:gap-6 lg:gap-8">
            {cart?.totalQuantity === 0 && (
              <EmptyState
                title="Your Cart is empty"
                subtitle="Looks like you haven’t added anything to your cart yet"
                showReset
                center
                label="Continue Shopping"
                onClick={() => navigate('/')}
              />
            )}
            <ul>
              {cart &&
                cart?.items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                  />
                ))}
            </ul>
            {cart?.totalQuantity !== 0 && <Summary />}
          </div>
        </div>
      </div>
    </Container>
  );
};
export default CartPage;
