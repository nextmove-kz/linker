"use client";

import { HexColorPicker } from "react-colorful";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";

const ColorPicker = ({
  label,
  name,
  selectedColor,
  onColorChange,
}: {
  label?: string;
  name: string;
  selectedColor: string;
  onColorChange: (color: string) => void;
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onColorChange(value);
  };

  return (
    <div className="space-y-2 flex flex-col">
      <Label htmlFor="color">{label}</Label>
      <HexColorPicker
        color={selectedColor}
        onChange={onColorChange}
        className="mx-auto"
      />
      <Input
        id="color"
        name={name}
        value={selectedColor}
        required
        onChange={handleInputChange}
        placeholder="Введите hex цвета (например, #7b39ed)"
      />
    </div>
  );
};

export default ColorPicker;
