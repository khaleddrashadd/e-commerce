import Heading from '@/components/ui/Heading';
import { Separator } from '@/components/ui/Separator';
import { DataTable } from '@/components/ui/dataTable';
import { ordersColumns } from './OrdersColumns';

const Orders = ({ orders }) => {
  return (
    <>
      <div className="flex items-center justify-between flex-col sm:flex-row gap-y-4">
        <Heading
          title={`Orders (${orders?.length})`}
          description="Manage orders of your store"
        />
      </div>
      <Separator />
      <DataTable
        data={orders}
        columns={ordersColumns}
        searchKey="product"
        tableName="orders"
      />
    </>
  );
};
export default Orders;
