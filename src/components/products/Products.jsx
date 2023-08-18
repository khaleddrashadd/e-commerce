import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import Heading from '../ui/Heading';
import { Separator } from '../ui/separator';
import { DataTable } from '../ui/dataTable';
import { productsColumns } from './ProductsColumns';

const Products = ({ product=[] }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Product (${product?.length})`}
          description="Manage product of your store"
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
        data={product}
        columns={productsColumns}
        searchKey="name"
        tableName="products"
      />
    </>
  );
};
export default Products;
