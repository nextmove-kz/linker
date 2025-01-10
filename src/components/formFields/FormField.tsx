import React from "react";
import { Label } from "../ui/label";

export default function FormField({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{name}</Label>
      {children}
    </div>
  );
}
