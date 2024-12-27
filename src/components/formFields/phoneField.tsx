import PhoneInput from "./phoneInput";

type PhoneFieldProps = {
  name?: string;
};

export default function PhoneField({ name }: PhoneFieldProps) {
  if (!name) name = "Телефон";
  return (
    <div className="flex flex-col gap-2">
      <p>{name}</p>
      <PhoneInput name={name} />
    </div>
  );
}
