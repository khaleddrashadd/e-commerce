import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storeModalActions } from '../redux/slices/store-modal-slice';

export function ComboboxDemo({ items }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { storeId } = useParams();
  const dispatch = useDispatch();

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] justify-between">
          <div className="flex items-center gap-2">
            <StoreIcon className="h-4 w-4" />
            {storeId
              ? items.find(item => item.id === storeId)?.name
              : 'Select store...'}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup>
              {items.map(item => (
                <CommandItem
                  key={item.id}
                  className={`${
                    storeId === item.id ? 'bg-accent' : ''
                  } cursor-pointer hover:bg-accent hover:bg-opacity-10`}
                  onSelect={() => {
                    navigate(`/admin/${item.id}`);
                    setOpen(false);
                  }}>
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      storeId === item.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
              className="cursor-pointer hover:bg-accent hover:bg-opacity-10"
                onSelect={() => {
                  dispatch(storeModalActions.openModal());
                  setOpen(false);
                }}>
                <PlusCircle className="mr-2 h-5 w-5" />
                Create a store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
