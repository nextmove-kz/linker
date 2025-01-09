import React from "react";
import FormField from "./FormField";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const MultiChoice = ({ name, items }: { name: string; items: string[] }) => {
  return (
    <FormField name={name}>
      {items.map((item) => (
        <div className="flex gap-2" key={item}>
          <Checkbox></Checkbox>
          <Label htmlFor={item}>{item}</Label>
        </div>
      ))}
    </FormField>
  );
};

export default MultiChoice;
