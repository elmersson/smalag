import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import type React from "react";

interface InputFieldProps<T extends FieldValues>
  extends React.ComponentProps<typeof Input> {
  label: string;
  placeholder?: string;
  controlProps: UseControllerProps<T>;
}

function InputField<T extends FieldValues>({
  label,
  placeholder,
  controlProps,
  ...props
}: InputFieldProps<T>) {
  const { field, fieldState } = useController(controlProps);
  return (
    <Label className="flex flex-col gap-2" htmlFor={`input-${label}`}>
      {label && label}
      <Input
        id={`input-${label}`}
        placeholder={placeholder}
        ref={field.ref}
        type="text"
        value={field.value ?? ""}
        className="bg-themeBlack border-themeGray text-themeTextGray"
        onChange={(e) => field.onChange(e.target.value)}
        aria-labelledby={`label-${label}`}
        aria-invalid={!!fieldState?.error}
        aria-describedby={`error-${label}`}
        {...props}
      />
      {fieldState?.error && (
        <p
          id={`error-${label}`}
          className="text-red-400"
          role="alert"
          aria-live="assertive"
        >
          {fieldState.error.message}
        </p>
      )}
    </Label>
  );
}

export default InputField;
