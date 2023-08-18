import { useLoaderData } from 'react-router-dom';
import { SizesForm } from '@/components/Dashboard/sizes';

const SizePage = () => {
  const sizeData = useLoaderData();
  return (
    <div className="flex flex-col gap-4 p-8 pt-6">
      <SizesForm size={sizeData} />
    </div>
  );
};
export default SizePage;
