import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormControl,  FormItem, FormLabel, FormDescription, FormMessage } from "./ui/form";
import { Input } from "./ui/input";


interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string; // Fixed: Added type annotation
  type?: 'text' | 'email' | 'password' | 'file';
}

export const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "", // Default empty string if undefined
  type = "text"
}: FormFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="label">{label}</FormLabel> {/* Fixed: Dynamic label */}
        <FormControl>
          <Input
          className="input text-white"
            placeholder={placeholder} // Fixed: Dynamic placeholder
            type={type}
            {...field}
          />
        </FormControl>
     
        <FormMessage />
      </FormItem>
    )}
  />
);