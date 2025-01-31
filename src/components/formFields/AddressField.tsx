import { Input } from "../ui/input";
import FormField from "./FormField";
import { BaseFieldProps } from "./FormFieldRenderer";

interface AddressFieldProps extends BaseFieldProps {
  accuracy_level?: "house" | "apartment" | "entrance" | "free_input";
  fixed_city?: string;
}

export default function AddressField({
  name = "Адрес",
  required,
  accuracy_level,
  fixed_city,
}: AddressFieldProps) {
  return (
    <FormField name={name} required={required}>
      <Input name={name + "_street"} placeholder="Улица" required={required} />
      <div className="flex gap-2">
        <Input name={name + "_house"} placeholder="Дом" required={required} />
        <Input
          name={name + "_apartment"}
          placeholder="Квартира"
          required={required}
        />
      </div>
    </FormField>
  );
}
