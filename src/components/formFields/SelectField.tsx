import React from "react";
import FormField from "./FormField";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BaseFieldProps } from "./FormFieldRenderer";

interface SelectFieldProps extends BaseFieldProps {
  options: string[];
}

const SelectField = ({ name = "Выберите", options = [] }: SelectFieldProps) => {
  return (
    <FormField name={name}>
      <Select name={name + "_select"}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Выберите" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormField>
  );
};

export default SelectField;
