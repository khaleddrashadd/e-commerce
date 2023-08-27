import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NavbarCart = () => {
  const navigate = useNavigate();

  const { totalQuantity } = useSelector((state) => state.cart);

  return (
    <Button
      className="flex items-center rounded-full py-2 px-4"
      variant="outline"
      onClick={() => navigate('/cart')}>
      <ShoppingBag
        size={20}
        color="green"
      />
      <span className="font-medium text-green-600 ml-2">{totalQuantity}</span>
    </Button>
  );
};
export default NavbarCart;
