import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import Heading from '../ui/Heading';
import { Separator } from '../ui/separator';
import { DataTable } from '../ui/dataTable';
import { colorsColumns } from './ColorsColumns';

const Colors = ({ colors }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${colors?.length})`}
          description="Manage colors of your store"
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
        data={colors}
        columns={colorsColumns}
        searchKey="name"
      />
    </>
  );
};
export default Colors;
