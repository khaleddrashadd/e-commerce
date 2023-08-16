import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import Heading from '../ui/Heading';
import { Separator } from '../ui/separator';
import { DataTable } from '../ui/dataTable';
import { sizesColumns } from './SizesColumns';

const Sizes = ({ sizes=[] }) => {
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
      />
    </>
  );
};
export default Sizes;
