"use client";
import Branding from "@/components/branding";
import AddressField from "@/components/formFields/addressField";
import PhoneField from "@/components/formFields/phoneField";
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
      <Button type="submit" className="mt-6">
        Перейти к оплате
      </Button>
    </form>
  );
}
