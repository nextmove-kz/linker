import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { ExpandedSettings } from "@/api/custom_types";
import FormField from "../formFields/FormField";

const SettingsMultiChoice = ({
  settings,
  name,
  required,
}: {
  settings: ExpandedSettings;
  name: string | undefined;
  required: boolean;
}) => {
  const [checkedCount, setCheckedCount] = useState(0);

  const handleCheckboxChange = (checked: boolean) => {
    setCheckedCount((prev) => (checked ? prev + 1 : prev - 1));
  };

  return (
    <FormField name={name || ""}>
      {settings.expand.variants.map((item, index) => (
        <div className="flex gap-2 items-center" key={item.id}>
          <Checkbox
            id={item.id}
            name={`${settings.name}_${index}`}
            value={item.id}
            onCheckedChange={handleCheckboxChange}
            required={required && checkedCount === 0}
          />
          <Label htmlFor={item.id}>{item.name}</Label>
          {(item.price_change || 0) >= 0 ? (
            <Label className="text-primary">+{item.price_change} ₸</Label>
          ) : (
            <Label className="text-primary">{item.price_change} ₸</Label>
          )}
        </div>
      ))}
    </FormField>
  );
};

export default SettingsMultiChoice;
