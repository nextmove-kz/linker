import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import FormField from "./FormField";
import { BaseFieldProps } from "./FormFieldRenderer";

interface SingleChoiceProps extends BaseFieldProps {
  options?: string[];
}

const SingleChoice = ({
  name = "Выберите",
  options = [],
}: SingleChoiceProps) => {
  return (
    <FormField name={name}>
      <RadioGroup name={name + "_group"}>
        {options.map((item, index) => (
          <div className="flex items-center space-x-2" key={item}>
            <RadioGroupItem value={item} id={item + name} />
            <Label htmlFor={item + name}>{item}</Label>
          </div>
        ))}
      </RadioGroup>
    </FormField>
  );
};

export default SingleChoice;
