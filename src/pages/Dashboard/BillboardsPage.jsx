import { useRouteLoaderData } from 'react-router-dom';
import { Billboards } from '@/components/Dashboard/billboards';
import { format } from 'date-fns';

const BillboardsPage = () => {
  const billboards = useRouteLoaderData('billboards');
  const formattedBillboards = billboards.map((billboard) => ({
    id: billboard.id,
    imageUrl: billboard.imageUrl,
    name: billboard.name,
    createdAt: format(new Date(billboard.createdAt), 'MMMM do,yyyy'),
  }));

  return (
    <div className="flex flex-col gap-4 pt-6 p-8">
      <Billboards billboards={formattedBillboards} />
    </div>
  );
};
export default BillboardsPage;
