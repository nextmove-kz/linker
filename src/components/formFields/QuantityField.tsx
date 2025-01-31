import Counter from "../shared/Counter";
import FormField from "./FormField";
import { BaseFieldProps } from "./FormFieldRenderer";

interface QuantityFieldProps extends BaseFieldProps {
  default_value?: number;
  max_value?: number;
}

export default function QuantityField({
  name = "Количество",
  default_value,
  max_value = 99,
}: QuantityFieldProps) {
  return (
    <FormField name={name}>
      <Counter defaultValue={default_value} max={max_value} name={name} />
    </FormField>
  );
}
