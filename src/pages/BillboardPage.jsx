import { useLoaderData } from 'react-router-dom';
import { BillboardsForm } from '../components/billboards';

const BillboardPage = () => {
  const billboardData = useLoaderData();
  return (
      <div className="flex flex-col gap-4 p-8 pt-6">
        <BillboardsForm billboard={billboardData}/>
      </div>
  );
};
export default BillboardPage;
