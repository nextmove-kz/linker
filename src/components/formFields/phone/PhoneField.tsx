import { Label } from "../../ui/label";
import FormField from "../FormField";
import PhoneInput from "./PhoneInput";

type PhoneFieldProps = {
  name?: string;
};

export default function PhoneField({ name = "Телефон" }: PhoneFieldProps) {
  return (
    <FormField name={name}>
      <PhoneInput name={name} />
    </FormField>
  );
}
