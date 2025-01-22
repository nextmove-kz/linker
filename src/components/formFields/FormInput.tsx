import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import FormField from "./FormField";
import TextAreaField from "./TextAreaField";

export type TextFieldProps = {
  name: string;
  required?: boolean;
  min_length?: string;
  max_length?: string;
  placeholder?: string;
  default_value?: string;
  multiline?: boolean;
};

export default function InputField(props: TextFieldProps) {
  const {
    name,
    required,
    min_length,
    max_length,
    placeholder,
    default_value = "",
    multiline = false,
  } = props;

  if (multiline) {
    return <TextAreaField {...props} />;
  }

  return (
    <FormField name={name} required={required}>
      <Input
        type="text"
        name={name + "_text"}
        defaultValue={default_value}
        placeholder={placeholder || `${name}`}
        minLength={min_length ? parseInt(min_length) : undefined}
        maxLength={max_length ? parseInt(max_length) : undefined}
        required={required}
      />
    </FormField>
  );
}
