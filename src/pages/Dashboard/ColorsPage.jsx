import { useRouteLoaderData } from 'react-router-dom';
import { format } from 'date-fns';
import { Colors } from '@/components/Dashboard/colors';

const ColorsPage = () => {
  const colors = useRouteLoaderData('colors');
  const formattedColors = colors?.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    category: color.category.name,
    createdAt: format(new Date(color.createdAt), 'MMMM do,yyyy'),
  }));
  return (
    <div className="flex flex-col gap-4 pt-6 p-8">
      <Colors colors={formattedColors} />
    </div>
  );
};
export default ColorsPage;
