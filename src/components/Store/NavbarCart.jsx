import { Button } from '@/components/ui/Button';
import { ShoppingBag } from 'lucide-react';
import { useSelector } from 'react-redux';

const NavbarCart = () => {
  const { totalQuantity } = useSelector((state) => state.cart);
  return (
    <Button className="flex items-center rounded-full py-2 px-4">
      <ShoppingBag
        size={20}
        color="white"
      />
      <span className="font-medium text-white ml-2">{totalQuantity}</span>
    </Button>
  );
};
export default NavbarCart;
