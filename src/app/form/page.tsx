"use client";
import { makeOrder } from "@/api/order";
import Branding from "@/components/branding";
import AddressField from "@/components/formFields/AddressField";
import { DateTimeField } from "@/components/formFields/dateTime/DateTimeField";
import DropdownField from "@/components/formFields/DropdownField";
import { InputField } from "@/components/formFields/FormInput";
import ImageUploader from "@/components/formFields/ImageUploader";
import MultiChoice from "@/components/formFields/MultiChoice";
import PhoneField from "@/components/formFields/phone/PhoneField";
import { QuantityField } from "@/components/formFields/QuantityField";
import SingleChoice from "@/components/formFields/SingleChoice";
import TextAreaField from "@/components/formFields/TextAreaField";

import { Button } from "@/components/ui/button";

export default function FormPage() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const formDataJson: Record<string, any> = {};
    formData.forEach((value, key) => {
      if (!formDataJson[key]) {
        formDataJson[key] = value;
      } else if (Array.isArray(formDataJson[key])) {
        formDataJson[key].push(value);
      } else {
        formDataJson[key] = [formDataJson[key], value];
      }
    });
    console.log(formDataJson);
    const result = await makeOrder(formData);
    console.log(result);
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
      <InputField name="Проверка" />
      <TextAreaField />
      <DropdownField
        name="Выпадающее меню"
        items={["Пункт 1", "Пункт 2", "Пункт 3"]}
      />
      <MultiChoice
        name="Множественный выбор"
        items={["Пункт 1", "Пункт 2", "Пункт 3"]}
      />
      <SingleChoice
        name="Единичный выбор"
        items={["Пункт 1", "Пункт 2", "Пункт 3"]}
      />
      <ImageUploader />
      <Button type="submit" className="mt-6">
        Перейти к оплате
      </Button>
    </form>
  );
}
