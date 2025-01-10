import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import FormField from "./FormField";

type InputFieldProps = {
  name?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export function InputField({
  name = "Введите данные",
  defaultValue,
  onChange,
  placeholder,
}: InputFieldProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <FormField name={name}>
      <Input
        type="text"
        name={name}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        placeholder={placeholder ? placeholder : "Введите данные..."}
      />
    </FormField>
  );
}
