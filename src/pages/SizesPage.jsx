import { useRouteLoaderData } from 'react-router-dom';
import { format } from 'date-fns';
import { Sizes } from '../components/sizes';

const SizesPage = () => {
  const sizes = useRouteLoaderData('sizes');
  const formattedSizes = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: format(new Date(size.createdAt), 'MMMM do,yyyy'),
  }));
  return (
    <div className="flex flex-col gap-4 pt-6 p-8">
      <Sizes sizes={formattedSizes} />
    </div>
  );
};
export default SizesPage;
