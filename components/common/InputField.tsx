import { FieldValues, useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { INPUT_TYPES, InputFieldProps } from "@/types/form";

/**
 * Capitalizes the first letter of each word in a string
 */
export const capitalizeText = (text: string) => {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export interface SelectOptions {
  label: string;
  value: string | number;
}

/**
 * A reusable form input field component that supports various input types
 * including text, checkbox, select, and textarea.
 */
export const InputField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  defaultValue,
  type = INPUT_TYPES.TEXT,
  disabled,
  label,
  placeholder,
  selectOptions,
  className,
  multiline = false,
  showIsRequired = false,
}: InputFieldProps<TFieldValues>) => {
  const { control } = useFormContext();

  // Common styling for form labels with required indicator
  const renderFormLabel = (labelText?: string) => (
    <FormLabel className="paragraph-medium text-dark400_light700">
      {capitalizeText(labelText || "")}
      {showIsRequired && <span className="text-red-500">{` * `}</span>}
    </FormLabel>
  );

  // Common props for input elements
  const commonInputProps = {
    placeholder,
    type,
    defaultValue,
    disabled,
    className:
      "paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 resize-none rounded-1.5 border",
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        switch (type) {
          case INPUT_TYPES.CHECKBOX:
            return (
              <FormItem
                className={cn(
                  className,
                  "flex items-center w-full flex-col gap-2.5"
                )}
              >
                {renderFormLabel(label)}
                <FormControl>
                  <Input
                    {...field}
                    value={defaultValue}
                    type={type}
                    className="size-4 rounded-sm"
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );

          case INPUT_TYPES.SELECT:
            return (
              <FormItem className={className}>
                {renderFormLabel(label)}
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={disabled}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={capitalizeText(placeholder || "")}
                      />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {selectOptions?.map(({ value, label }) => (
                      <SelectItem key={value} value={value.toString()}>
                        {capitalizeText(label)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );

          default:
            if (multiline) {
              return (
                <FormItem className={className}>
                  {renderFormLabel(label)}
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={5}
                      placeholder={placeholder}
                      defaultValue={defaultValue}
                      disabled={disabled}
                      className={commonInputProps.className}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }

            return (
              <FormItem className={className}>
                {renderFormLabel(label)}
                <FormControl>
                  <Input {...field} {...commonInputProps} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
        }
      }}
    />
  );
};
