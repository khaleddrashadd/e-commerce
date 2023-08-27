import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/dataTable';
import { productsColumns } from './ProductsColumns';

const Products = ({ products = [] }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between flex-col sm:flex-row gap-y-4">
        <Heading
          title={`Product (${products?.length})`}
          description="Manage products of your store"
        />
        <Button onClick={() => navigate('new')}>
          <Plus
            size={16}
            className="mr-2"
          />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        data={products}
        columns={productsColumns}
        searchKey="name"
        tableName="products"
      />
    </>
  );
};
export default Products;
