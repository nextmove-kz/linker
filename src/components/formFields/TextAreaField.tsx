import { Textarea } from "../ui/textarea";
import FormField from "./FormField";

const TextAreaField = ({ name }: { name: string }) => {
  return (
    <FormField name={name || "Текст"}>
      <Textarea
        className="w-full p-2 border rounded"
        placeholder="Введите текст"
      />
    </FormField>
  );
};

export default TextAreaField;
