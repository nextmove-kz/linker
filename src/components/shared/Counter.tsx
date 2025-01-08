import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CounterProps = {
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  name?: string;
};

export default function Counter({
  defaultValue = 1,
  min = 1,
  max = 99,
  onChange,
  name,
}: CounterProps) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue: number) => {
    // Ensure the value wraps around
    if (newValue > max) newValue = min;
    if (newValue < min) newValue = max;

    setValue(newValue);
    onChange?.(newValue);
  };

  // Remove leading zeros when the input changes
  const handleInputChange = (input: string) => {
    // Remove leading zeros and parse to number
    const numberValue = parseInt(input.replace(/^0+/, "")) || min;
    handleChange(numberValue);
  };

  return (
    <div className="flex items-center gap-1 border border-gray-200 rounded-md w-fit shadow-sm">
      <Button
        type="button"
        variant="ghost"
        className="h-10 px-3 text-lg font-medium"
        onClick={() => handleChange(value - 1)}
      >
        −
      </Button>
      <Input
        type="text"
        name={name ? `${name}_count` : undefined}
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        className="w-12 border-0 text-center text-lg shadow-none focus:ring-0 p-0"
      />
      <Button
        type="button"
        variant="ghost"
        className="h-10 px-3 text-lg font-medium"
        onClick={() => handleChange(value + 1)}
      >
        +
      </Button>
    </div>
  );
}
