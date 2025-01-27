import FormField from "../formFields/FormField";
import { Input } from "../ui/input";

type CashInputProps = {
  name: string;
  required?: boolean;
  placeholder?: string;
  totalSum: number;
};

export default function CashInput({
  name,
  required = false,
  placeholder,
  totalSum,
}: CashInputProps) {
  return (
    <FormField name={name} required={required}>
      <div className="relative">
        <Input
          type="number"
          name={name + "_text"}
          placeholder={placeholder || totalSum.toString()}
          min={totalSum}
          defaultValue={totalSum}
          required={required}
          className="pr-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          onInvalid={(e: React.InvalidEvent<HTMLInputElement>) => {
            if (Number(e.target.value) < totalSum) {
              e.target.setCustomValidity(
                `Сумма должна быть не менее ${totalSum.toLocaleString()} ₸`
              );
            } else {
              e.target.setCustomValidity("");
            }
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const input = e.target;
            if (Number(input.value) < totalSum) {
              input.setCustomValidity(
                `Сумма должна быть не менее ${totalSum.toLocaleString()} ₸`
              );
            } else {
              input.setCustomValidity("");
            }
          }}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
          ₸
        </span>
      </div>
    </FormField>
  );
}
