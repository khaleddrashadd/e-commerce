import { Button } from '@/components/ui/Button';
import Currency from '@/components/ui/Currency';
import { Expand, ShoppingCart } from 'lucide-react';

const ProductCard = ({ item }) => {
  return (
    <div
      key={item.id}
      className="flex flex-col gap-y-4 group cursor-pointer border p-3 overflow-hidden rounded-xl">
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <img
          className="aspect-square object-cover w-full h-full rounded-md"
          src={item.imagesUrl[0]}
          alt={item.name}
        />
        <div className="opacity-0 group-hover:opacity-100 absolute transition bottom-5 w-full">
          <div className="flex gap-x-6 justify-center">
            <Button
              onClick={() => {}}
              variant="outline"
              className="rounded-full hover:scale-110 transition px-2">
              <Expand
                size={20}
                className="text-gray-600"
              />
            </Button>
            <Button
              onClick={() => console.log('add to cart')}
              variant="outline"
              className="rounded-full hover:scale-110 transition px-2">
              <ShoppingCart
                size={20}
                className="text-gray-600"
              />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <p className="font-semibold text-lg">{item.name}</p>
        <p className="font-semibold text-sm text-gray-500">
          {item?.category.name}
        </p>
        <Currency value={item.price} />
      </div>
    </div>
  );
};
export default ProductCard;
