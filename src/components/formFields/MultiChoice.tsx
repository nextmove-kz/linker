"use client";
import React from "react";
import FormField from "./FormField";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const MultiChoice = ({
  name = "Выберите",
  items,
}: {
  name: string;
  items: string[];
}) => {
  return (
    <FormField name={name}>
      {items.map((item, index) => (
        <div className="flex gap-2" key={item}>
          <Checkbox
            name={name + "_multichoice"}
            id={item + name}
            value={item}
            defaultChecked={index === 0}
          ></Checkbox>
          <Label htmlFor={item + name}>{item}</Label>
        </div>
      ))}
    </FormField>
  );
};

export default MultiChoice;
