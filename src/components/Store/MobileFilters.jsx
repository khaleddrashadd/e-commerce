import { Button } from '@/components/ui/Button';
import { Filter } from '@/components/Store';
import { Filter as FilterIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const MobileFilters = ({ size, color, variant }) => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button
            as="div"
            className="flex items-center gap-3 rounded-full lg:hidden active:overflow-hidden"
            variant={variant}>
            Filter
            <FilterIcon size={20} />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <Filter
            valueKey="sizeId"
            data={size}
            name="Sizes"
          />
          <Filter
            valueKey="colorId"
            data={color}
            name="Colors"
          />
        </PopoverContent>
      </Popover>
    </>
  );
};
export default MobileFilters;
