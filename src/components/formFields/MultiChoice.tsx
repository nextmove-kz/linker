"use client";
import React from "react";
import FormField from "./FormField";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { BaseFieldProps } from "./FormFieldRenderer";

interface MultiChoiceProps extends BaseFieldProps {
  options?: string[];
}

const MultiChoice = ({
  name = "Выберите",
  required,
  options = [],
}: MultiChoiceProps) => {
  return (
    <FormField name={name}>
      {options.map((item, index) => (
        <div className="flex gap-2" key={item}>
          <Checkbox
            name={name + "_multichoice"}
            id={item + name}
            value={item}
          ></Checkbox>
          <Label htmlFor={item + name}>{item}</Label>
        </div>
      ))}
    </FormField>
  );
};

export default MultiChoice;
