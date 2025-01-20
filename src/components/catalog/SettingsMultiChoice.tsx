"use client";
import React from "react";
import FormField from "./FormField";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { ExpandedSettings } from "@/api/custom_types";

const SettingsMultiChoice = ({
  settings,
  name,
}: {
  settings: ExpandedSettings;
  name: string | undefined;
}) => {
  return (
    <FormField name={name || ""}>
      {settings.expand.variants.map((item, index) => (
        <div className="flex gap-2" key={item.id}>
          <Checkbox
            name={`${settings.name}_${index}`}
            id={item.id}
            value={item.id}
          />
          <Label htmlFor={item.id}>{item.name}</Label>
        </div>
      ))}
    </FormField>
  );
};

export default SettingsMultiChoice;
