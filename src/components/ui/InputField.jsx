import { Input } from './input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';

const InputField = ({ control, disabled, placeholder, name, title,...props }) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="font-semibold">{title}</FormLabel>
        <FormControl>
          <Input
            placeholder={placeholder}
            disabled={disabled}
            {...field}
            {...props}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
export default InputField;
