import React from "react";
import { Label } from "../ui/label";

export default function FormField({
  name,
  required = false,
  children,
}: {
  name: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>
        {name}
        {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
    </div>
  );
}
