import { useLoaderData } from 'react-router-dom';
import { format } from 'date-fns';
import { Orders } from '@/components/Dashboard/orders';
import { formatter } from '@/utils/currency-helper';

const OrdersPage = () => {
  const orders = useLoaderData();
  const formattedOrders = orders?.map((order) => ({
    id: order.id,
    product: order.orderItem[0]?.product.name||'',
    phone: order.phone,
    address: order.address,
    totalPrice: formatter.format(
      order.orderItem.reduce(
        (total, item) => total + Number(item.product.price),
        0
      )
    ),
    isPaid: order.isPaid ? 'Yes' : 'No',
    createdAt: format(new Date(order.createdAt), 'MMMM do,yyyy'),
  }));
  return (
    <div className="flex flex-col gap-4 pt-6 p-8">
      <Orders orders={formattedOrders} />
    </div>
  );
};
export default OrdersPage;
