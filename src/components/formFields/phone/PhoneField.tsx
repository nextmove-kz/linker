import { Label } from "../../ui/label";
import FormField from "../FormField";
import PhoneInput from "./PhoneInput";

type PhoneFieldProps = {
  name?: string;
  required?: boolean;
};

export default function PhoneField({
  name = "Телефон",
  required = false,
}: PhoneFieldProps) {
  return (
    <FormField required={required} name={name}>
      <PhoneInput name={name} />
    </FormField>
  );
}
