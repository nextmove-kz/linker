import { Textarea } from "../ui/textarea";
import FormField from "./FormField";

const TextAreaField = ({ name = "Текст" }: { name?: string }) => {
  return (
    <FormField name={name || "Текст"}>
      <Textarea
        className="w-full p-2 border rounded"
        placeholder="Введите текст"
        name={name}
      />
    </FormField>
  );
};

export default TextAreaField;
