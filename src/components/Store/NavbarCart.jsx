import { Button } from '@/components/ui/Button';
import { ShoppingBag } from 'lucide-react';

const NavbarCart = () => {
  return (
    <Button className="flex items-center rounded-full py-2 px-4">
      <ShoppingBag
        size={20}
        color="white"
      />
      <span className='font-medium text-white ml-2'>0</span>
    </Button>
  );
};
export default NavbarCart;
