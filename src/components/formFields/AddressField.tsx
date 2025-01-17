import { Input } from "../ui/input";
import FormField from "./FormField";

type AddressFieldProps = {
  name?: string;
};

export default function AddressField({ name = "Адрес" }: AddressFieldProps) {
  return (
    <FormField name={name}>
      <Input name={name + "_street"} placeholder="Улица" />
      <div className="flex gap-2">
        <Input name={name + "_housenumber"} placeholder="Дом" />
        <Input name={name + "_apartment"} placeholder="Квартира" />
      </div>
    </FormField>
  );
}
