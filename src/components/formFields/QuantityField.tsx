import Counter from "../shared/Counter";
import FormField from "./FormField";

type QuantityFieldProps = {
  name?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
};

export function QuantityField({
  name = "Количество",
  defaultValue,
  min,
  max,
  onChange,
}: QuantityFieldProps) {
  return (
    <FormField name={name}>
      <Counter
        defaultValue={defaultValue}
        onChange={onChange}
        min={min}
        max={max}
        name={name}
      />
    </FormField>
  );
}
