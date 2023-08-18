import { Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import Heading from '../ui/Heading';
import { Separator } from '../ui/Separator';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../ui/dataTable';
import { billboardsColumns } from './billboardsColumns';

const Billboards = ({ billboards }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${billboards?.length})`}
          description="Manage billboards of your store"
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
        data={billboards}
        columns={billboardsColumns}
        searchKey="name"
        tableName='billboards'

      />
    </>
  );
};
export default Billboards;
