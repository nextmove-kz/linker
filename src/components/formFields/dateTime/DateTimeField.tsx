import { useState } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { TimePickerDemo } from "./time-picker-demo";
import { DateTimePicker } from "./DateTimePicker";
import FormField from "../FormField";

type DateTimeFieldProps = {
  name?: string;
  minDate?: Date;
  maxDate?: Date;
};

export function DateTimeField({
  name = "Дата и время",
  minDate,
  maxDate,
}: DateTimeFieldProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <FormField name={name}>
      <DateTimePicker name={name + "_datetime"} />
    </FormField>
  );
}
