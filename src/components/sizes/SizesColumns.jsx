import {
  ArrowUpDown,
  Copy,
  FileSignature,
  MoreHorizontal,
  Trash,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useFetcher, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import AlertModal from '../Modals/AlertModal';
import { alertModalActions } from '../../redux/slices/alert-modal-slice';

export const sizesColumns = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'value',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Value
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const action = row.original;
      const navigate = useNavigate();
      const fetcher = useFetcher();
      const dispatch = useDispatch();
      const { isOpen } = useSelector((state) => state.alertModal);

      const oncopy = (id) => {
        navigator.clipboard.writeText(id);
        toast.success('Size id copied to clipboard');
      };

      const onConfirm = () => {
        fetcher.submit(
          { sizeId: action.id },
          {
            method: 'DELETE',
            action: 'sizeId',
          }
        );
        dispatch(alertModalActions.closeModal());
      };

      return (
        <>
          <AlertModal
            isOpen={isOpen}
            onClose={() => dispatch(alertModalActions.closeModal())}
            onConfirm={onConfirm}
            isLoading={fetcher.state !== 'idle'}
          />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="h-8 w-8 p-0 flex items-center justify-center">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => oncopy(action.id)}>
                <div className="flex items-center gap-2">
                  <Copy size={16} /> <span>copy id</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate(action.id)}>
                <div className="flex items-center gap-2">
                  <FileSignature size={16} /> <span>Update</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => dispatch(alertModalActions.openModal())}>
                <div className="flex items-center gap-2">
                  <Trash size={16} /> <span>Delete</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
