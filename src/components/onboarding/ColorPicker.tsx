"use client";

import { HexColorPicker } from "react-colorful";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";

const ColorPicker = ({ label, name }: { label?: string; name: string }) => {
  const [color, setColor] = useState("#7b39ed");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setColor(value);
  };

  return (
    <div className="space-y-2 flex flex-col">
      <Label htmlFor="color">{label}</Label>
      <HexColorPicker color={color} onChange={setColor} className="mx-auto" />
      <Input
        id="color"
        name={name}
        value={color}
        required
        onChange={handleInputChange}
        placeholder="Введите hex цвета (например, #7b39ed)"
      />
    </div>
  );
};

export default ColorPicker;
