import { DateTimePicker } from "./DateTimePicker";
import FormField from "../FormField";

type DateTimeFieldProps = {
  name?: string;
  minDate?: Date;
  maxDate?: Date;
};

export default function DateTimeField({
  name = "Дата и время",
}: DateTimeFieldProps) {
  return (
    <FormField name={name}>
      <DateTimePicker name={name + "_datetime"} />
    </FormField>
  );
}
