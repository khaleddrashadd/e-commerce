import { useLoaderData } from 'react-router-dom';
import { ColorsForm } from '@/components/Dashboard/colors';

const ColorPage = () => {
  const colorData = useLoaderData();
  return (
    <div className="flex flex-col gap-4 p-8 pt-6">
      <ColorsForm color={colorData} />
    </div>
  );
};
export default ColorPage;
