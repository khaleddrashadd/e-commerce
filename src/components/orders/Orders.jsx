import Heading from '../ui/Heading';
import { Separator } from '../ui/Separator';
import { DataTable } from '../ui/dataTable';
import { ordersColumns } from './OrdersColumns';

const Orders = ({ orders }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${orders?.length})`}
          description="Manage orders of your store"
        />
      </div>
      <Separator />
      <DataTable
        data={orders}
        columns={ordersColumns}
        searchKey="name"
        tableName="orders"
      />
    </>
  );
};
export default Orders;
