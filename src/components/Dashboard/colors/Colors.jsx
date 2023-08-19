import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/dataTable';
import { colorsColumns } from './ColorsColumns';

const Colors = ({ colors }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between flex-col sm:flex-row gap-y-4">
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
        tableName="colors"
      />
    </>
  );
};
export default Colors;
