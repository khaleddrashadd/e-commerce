import { useRouteLoaderData } from 'react-router-dom';
import { format } from 'date-fns';
import { Categories } from '../components/categories';

const CategoriesPage = () => {
  const categories = useRouteLoaderData('categories');
  const formattedCategories = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: format(new Date(category.createdAt), 'MMMM do,yyyy'),
  }));
  return (
    <div className="flex flex-col gap-4 pt-6 p-8">
      <Categories categories={formattedCategories} />
    </div>
  );
};
export default CategoriesPage;
