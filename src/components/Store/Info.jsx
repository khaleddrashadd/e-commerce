import Currency from '@/components/ui/Currency';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import Select from 'react-select';

const Info = ({ data }) => {
  const [selectedValue, setSelectedValue] = useState(1);

  const options = Array.from({ length: data?.quantity }, (_, i) => {
    return { value: i + 1, label: i + 1 };
  });
  console.log(selectedValue);
  const onSelect = (e) => {
    console.log(e);
  };
  return (
    <section className="flex flex-col gap-8 items-center">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold text-gray-900">{data?.name}</h2>
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
        </div>
      </div>
      <Select
        className="w-[80px]"
        placeholder="Qty"
        defaultValue={1}
        options={options}
        onChange={(val) => setSelectedValue(val.value)}
        maxMenuHeight={200}
        menuShouldScrollIntoView={false}
      />
      <Button className="rounded-full flex items-center gap-2 self-start">
        Add To Cart
        <ShoppingCart />
      </Button>
    </section>
  );
};
export default Info;
