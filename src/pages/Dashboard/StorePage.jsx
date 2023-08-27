import { CreditCard, DollarSign, Package } from 'lucide-react';
import Heading from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatter } from '@/utils/currency-helper';
import { OverView } from '@/components/Dashboard';
import { useRouteLoaderData } from 'react-router-dom';
import { getGraphData } from '@/utils/getGraphData';

const StorePage = () => {
  const storeData = useRouteLoaderData('store');
  const stockCount = storeData?.product.filter((item) => !item.archived).length;
  const salesCount = storeData?.order.filter((item) => item.isPaid).length;

  const completedOrders = storeData?.order
    .map((item) => item.orderItem)
    .filter((item) => item.length > 0)
    .flat();

  const totalRevenue = completedOrders
    .map((item) => item.product.price)
    .reduce((total, price) => total + Number(price), 0);

  const priceDateProducts = completedOrders.map((item) => ({
    createdAt: new Date(item.createdAt).getMonth(),
    price: item.product.price,
  }));

  const graphData = getGraphData(priceDateProducts);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title="Dashboard"
          description="Overview of your store"
        />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products In Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <OverView data={graphData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default StorePage;
