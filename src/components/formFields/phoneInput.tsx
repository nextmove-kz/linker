import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";

export default function PhoneInput({ name }: { name?: string }) {
  const [phone, setPhone] = useState("");

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length === 0) return "";

    let formatted = "";

    if (numbers.length > 0) {
      formatted = "+7";
      formatted += " (" + numbers.slice(0, 3);
    }
    if (numbers.length > 3) {
      formatted += ") " + numbers.slice(3, 6);
    }
    if (numbers.length > 6) {
      formatted += "-" + numbers.slice(6, 8);
    }
    if (numbers.length > 8) {
      formatted += "-" + numbers.slice(8, 10);
    }

    return formatted;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const valueToFormat = input.startsWith("+7") ? input.slice(2) : input;
    const numbers = valueToFormat.replace(/\D/g, "");

    if (numbers.length <= 10) {
      setPhone(formatPhoneNumber(numbers));
    }
  };

  return (
    <Input
      value={phone}
      name={name}
      placeholder="+7 (___) ___-__-__"
      onChange={handleChange}
    />
  );
}
