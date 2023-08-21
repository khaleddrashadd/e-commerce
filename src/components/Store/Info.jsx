import Currency from '@/components/ui/Currency';
import {Button} from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const Info = ({ data }) => {
  console.log(data);
  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-900">{data.name}</h2>
      <div className="mt-3 text-2xl text-gray-900">
        <Currency value={data?.price} />
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-x-3">
          <h3 className="font-semibold text-black">Size:</h3>
          <span>{data?.size?.name}</span>
        </div>
        <div className="flex items-center gap-x-3">
          <h3 className="font-semibold text-black">Color:</h3>
          <span
            className="h-6 w-6 rounded-full border border-gray-300"
            style={{ backgroundColor: data?.color.value }}
          />
        </div>
      <Button className='rounded-full flex items-center gap-2 self-start'>
        Add To Cart
          <ShoppingCart />
      </Button>
      </div>
    </section>
  );
};
export default Info;
