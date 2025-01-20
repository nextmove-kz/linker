import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import FormField from "./FormField";
import { ExpandedSettings } from "@/api/custom_types";

const SettingsSingleChoice = ({
  name,
  settings,
}: {
  name: string | undefined;
  settings: ExpandedSettings;
}) => {
  return (
    <FormField name={name || ""}>
      <RadioGroup name={name}>
        {settings.expand.variants.map((item) => (
          <div className="flex items-center space-x-2" key={item.id}>
            <RadioGroupItem value={item.id} id={item.id} />
            <Label htmlFor={item.id}>{item.name}</Label>
          </div>
        ))}
      </RadioGroup>
    </FormField>
  );
};

export default SettingsSingleChoice;
