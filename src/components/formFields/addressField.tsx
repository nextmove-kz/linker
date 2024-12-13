import { Input } from "../ui/input";

type AddressFieldProps = {
  name?: string;
};

export default function AddressField({ name }: AddressFieldProps) {
  if (!name) name = "Адрес";
  return (
    <div className="flex flex-col gap-2">
      <p>{name}</p>
      <Input name={name + "_street"} placeholder="Улица" />
      <div className="flex gap-2">
        <Input name={name + "_house_number"} placeholder="Дом" />
        <Input name={name + "_apartment"} placeholder="Квартира" />
      </div>
    </div>
  );
}
