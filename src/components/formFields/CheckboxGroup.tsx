"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export interface CheckboxOption {
  id: string;
  name: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  onChange: (selectedIds: string[]) => void;
}

export function CheckboxGroup({ options, onChange }: CheckboxGroupProps) {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  React.useEffect(() => {
    onChange(selectedIds);
  }, [selectedIds, onChange]);

  return (
    <fieldset className="space-y-4">
      {options.map((option) => (
        <div key={option.id} className="flex items-center space-x-2">
          <Checkbox
            id={option.id}
            checked={selectedIds.includes(option.id)}
            onCheckedChange={() => handleCheckboxChange(option.id)}
          />
          <Label
            htmlFor={option.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {option.name}
          </Label>
        </div>
      ))}
    </fieldset>
  );
}
