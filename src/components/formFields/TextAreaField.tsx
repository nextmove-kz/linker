import { Textarea } from "../ui/textarea";
import FormField from "./FormField";
import { TextFieldProps } from "./FormInput";

const TextAreaField = ({
  name = "Текст",
  placeholder,
  required,
  min_length,
  max_length,
  default_value,
}: TextFieldProps) => {
  return (
    <FormField name={name || "Текст"} required={required}>
      <Textarea
        minLength={min_length ? parseInt(min_length) : undefined}
        maxLength={max_length ? parseInt(max_length) : undefined}
        defaultValue={default_value}
        className="w-full p-2 border rounded"
        placeholder={placeholder || `${name}...`}
        name={name + "_textarea"}
      />
    </FormField>
  );
};

export default TextAreaField;
