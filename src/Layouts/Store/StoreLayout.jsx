import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '@/components/Store';
import { PreviewModal } from '@/components/Store/Modals';
import { useCookies } from 'react-cookie';
import { v4 as uuid } from 'uuid';
import { useEffect } from 'react';
import useUpdateCartDb from '../../hooks/useUpdateCartDb';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../redux/slices/cart-slice';

const StoreLayout = () => {
  const dispatch = useDispatch();
  const { updateCartDb, isLoading } = useUpdateCartDb();
  const [cookies, setCookie] = useCookies(['browserId']);
  const { getCartDb } = useUpdateCartDb();

  const cart = useSelector((state) => state.cart);
  console.log(cart.totalPrice);
  useEffect(() => {
    if (cart.changed) {
      updateCartDb(cart);
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

  return (
    <>
      <Navbar />
      <PreviewModal />
      <Outlet context={isLoading} />
      <Footer />
    </>
  );
};
export default StoreLayout;
