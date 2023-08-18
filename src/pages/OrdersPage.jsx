import { useLoaderData } from 'react-router-dom';
import { format } from 'date-fns';
import { Orders } from '../components/orders';

const OrdersPage = () => {
  const orders = useLoaderData();
  console.log(orders);
  const formattedorders = orders?.map((order) => ({
    id: order.id,
    name: order.name,
    billboardLabel: order.billboard.name,
    createdAt: format(new Date(order.createdAt), 'MMMM do,yyyy'),
  }));
  return (
    <div className="flex flex-col gap-4 pt-6 p-8">
      <Orders orders={formattedorders} />
    </div>
  );
};
export default OrdersPage;
