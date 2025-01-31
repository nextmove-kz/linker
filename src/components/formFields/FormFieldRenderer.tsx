import SelectField from "./SelectField";
import InputField from "./FormInput";
import TextAreaField from "./TextAreaField";
import AddressField from "./AddressField";
import ImageUploader from "./ImageUploader";
import MultiChoice from "./MultiChoice";
import QuantityField from "./QuantityField";
import SingleChoice from "./SingleChoice";
import DateTimeField from "./dateTime/DateTimeField";
import PhoneField from "./phone/PhoneField";

const fieldComponents = {
  text: InputField,
  textarea: TextAreaField,
  select: SelectField,
  address: AddressField,
  photo: ImageUploader,
  multi_radio: MultiChoice,
  quantity: QuantityField,
  radio: SingleChoice,
  date_time: DateTimeField,
  phone: PhoneField,
} as const;

interface FieldData {
  id: string;
  name: string;
  fieldType: string;
  position: number;
  required: boolean;
  settings: Record<string, string>;
  options?: Array<{ value: string }>;
}

export interface BaseFieldProps {
  name?: string;
  required?: boolean;
}

export function FormFieldRenderer({ field }: { field: FieldData }) {
  const Component =
    fieldComponents[field.fieldType as keyof typeof fieldComponents];

  if (!Component) {
    console.warn(`Unknown field type: ${field.fieldType}`);
    return null;
  }

  const options = field.options && field.options.map((option) => option.value);

  return (
    <Component
      name={field.name}
      required={field.required}
      {...field.settings}
      {...(field.options && { options })}
    />
  );
}
