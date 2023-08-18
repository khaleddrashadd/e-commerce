import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/dataTable';
import { sizesColumns } from './SizesColumns';

const Sizes = ({ sizes }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${sizes?.length})`}
          description="Manage sizes of your store"
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
        data={sizes}
        columns={sizesColumns}
        searchKey="name"
        tableName="sizes"
      />
    </>
  );
};
export default Sizes;
