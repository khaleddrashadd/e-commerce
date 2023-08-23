import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';

import { Textarea } from '@/components/ui/textarea';

const TextAreaField = ({
  control,
  disabled,
  placeholder,
  name,
  title,
  className,
  ...props
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={`resize-none ${className}`}
              disabled={disabled}
              {...field}
              {...props}
            />
          </FormControl>
          <FormDescription>
            Brief description for the category (max 40 characters)
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default TextAreaField;
