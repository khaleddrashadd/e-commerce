import { Outlet, useNavigation } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { Footer, Navbar } from '@/components/Store';
import { PreviewModal } from '@/components/Store/Modals';
import { useCookies } from 'react-cookie';
import { v4 as uuid } from 'uuid';
import { useEffect } from 'react';
import useUpdateCartDb from '@/hooks/useUpdateCartDb';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '@/redux/slices/cart-slice';

const StoreLayout = () => {
  const dispatch = useDispatch();
  const { updateCartDb, isLoading } = useUpdateCartDb();
  const [cookies, setCookie] = useCookies(['browserId']);
  const { getCartDb } = useUpdateCartDb();
  const navigation = useNavigation();

  const routeIsLoading = navigation.state === 'loading';

  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    if (!cart.isAvailable) return;

    if (cart.changed) {
      updateCartDb({
        items: cart.items,
        totalQuantity: cart.totalQuantity,
        totalPrice: cart.totalPrice,
      });
    }
  }, [cart]);

  useEffect(() => {
    if (!cookies.browserId) {
      setCookie('browserId', uuid());
      return;
    }
    const getCartData = async () => {
      const { cartDb, err } = await getCartDb();
      if (err) return toast.error(err.message);
      if (cartDb.length === 0) return;
      dispatch(cartActions.replaceCart(cartDb[0]?.cart));
    };
    getCartData();
  }, [cookies.browserId]);
  const loadingSkeleton = (
    <div className="flex flex-col gap-8 items-center justify-center">
      <Skeleton className="h-[220px] w-full" />
      <div className="flex gap-8">
        <Skeleton className="h-[220px] w-[200px]" />
        <Skeleton className="h-[220px] w-[200px]" />
        <Skeleton className="h-[220px] w-[200px]" />
        <Skeleton className="h-[220px] w-[200px]" />
      </div>
    </div>
  );
  return (
    <>
      <Navbar />
      <PreviewModal />
      {routeIsLoading ? (
        loadingSkeleton
      ) : (
        <Outlet context={{ isLoading, browserId: cookies.browserId }} />
      )}
      <Footer />
    </>
  );
};
export default StoreLayout;
