"use client";
import clientPocketBase from "@/api/client_pb";
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
import { useRouter } from "next/navigation";

export default function FormPage() {
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const fileInputs = e.currentTarget.querySelectorAll('input[type="file"]');
    const files: File[] = [];

    fileInputs.forEach((input) => {
      const fileList = (input as HTMLInputElement).files;
      if (fileList) {
        for (let i = 0; i < fileList.length; i++) {
          files.push(fileList[i]);
        }
      }
    });

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
    const data = {
      orderData: Object.fromEntries(formData.entries()),
      finished: false,
      attachments: files,
    };
    try {
      const result = await clientPocketBase
        .collection("orders")
        .create({ orderData: formData, finished: false, attachments: files });
      console.log(result);
      router.push(`/message/${result.id}`);
    } catch (error) {
      console.error("Order error:", error);
      return { error: "Failed to create order" };
    }
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
