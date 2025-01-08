"use client";
import Branding from "@/components/branding";
import AddressField from "@/components/formFields/AddressField";
import { DateTimeField } from "@/components/formFields/dateTime/DateTimeField";
import PhoneField from "@/components/formFields/phone/PhoneField";
import { QuantityField } from "@/components/formFields/QuantityField";

import { Button } from "@/components/ui/button";

export default function FormPage() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formDataJson = Object.fromEntries(formData);
    console.log(formDataJson);
  };

  return (
    <form
      className="flex flex-col gap-4 w-[400px] p-2 mx-auto"
      onSubmit={onSubmit}
    >
      <Branding title="Linkin Burger" />
      <AddressField />
      <PhoneField />
      <QuantityField min={0} />
      <DateTimeField />
      <Button type="submit" className="mt-6">
        Перейти к оплате
      </Button>
    </form>
  );
}
