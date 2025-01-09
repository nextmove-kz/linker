import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import FormField from "./FormField";

const SingleChoice = ({ name, items }: { name: string; items: string[] }) => {
  return (
    <FormField name={name}>
      <RadioGroup>
        {items.map((item) => (
          <div className="flex items-center space-x-2" key={item}>
            <RadioGroupItem value={item} id={item} />
            <Label htmlFor={item}>{item}</Label>
          </div>
        ))}
      </RadioGroup>
    </FormField>
  );
};

export default SingleChoice;
