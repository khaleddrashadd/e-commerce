import { useMemo } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';

const SelectField = ({ data, disabled, placeholder, control, name, title }) => {
  const formattedData = useMemo(() => data?.sort((a, b) => (a.label > b.label ? 1 : -1)));
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold">{title}</FormLabel>
          <Select
            disabled={disabled}
            value={field.value}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {formattedData?.map((item) => (
                <SelectItem
                  key={item.id}
                  value={item.id}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default SelectField;