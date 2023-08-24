import { useCookies } from 'react-cookie';

const CartPage = () => {
  const [cookies, setCookie,removeCookie] = useCookies(['browserId']);

  return <div onClick={()=>removeCookie('browserId')}>CartPage</div>;
};
export default CartPage;
