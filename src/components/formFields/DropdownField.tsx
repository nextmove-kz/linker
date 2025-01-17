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

const DropdownField = ({
  name = "Выберите",
  items,
}: {
  name?: string;
  items: string[];
}) => {
  return (
    <FormField name={name}>
      <Select name={name + "_select"}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Выберите" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
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

export default DropdownField;
