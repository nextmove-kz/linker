import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import FormField from "./FormField";

const SingleChoice = ({
  name = "Выберите",
  items,
}: {
  name: string;
  items: string[];
}) => {
  return (
    <FormField name={name}>
      <RadioGroup name={name + "_group"}>
        {items.map((item, index) => (
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
