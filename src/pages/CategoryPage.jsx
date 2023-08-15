import { useLoaderData } from 'react-router-dom';
import { CategoriesForm } from '../components/categories';

const CategoryPage = () => {
  const categoryData = useLoaderData();
  return (
    <div className="flex flex-col gap-4 p-8 pt-6">
      <CategoriesForm
        category={categoryData}
      />
    </div>
  );
};
export default CategoryPage;
