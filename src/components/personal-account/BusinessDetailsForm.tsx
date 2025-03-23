"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import clientPocketBase from "@/api/client_pb";
import ColorPickerModal from "@/components/onboarding/ColorPickerModal";
import PhoneInputAuth from "@/components/onboarding/PhoneInputAuth";

const BRANDING_COLOR = "#7b39ed";

export default function BusinessDetailsForm({
  businessId,
}: {
  businessId: string;
}) {
  const [selectedColor, setSelectedColor] = useState(BRANDING_COLOR);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = { ...Object.fromEntries(formData), color: selectedColor };

    await clientPocketBase.collection("business").update(businessId, data);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen max-w-[400px] mx-auto p-4">
      <div className="flex gap-2 items-center w-full mb-8">
        <svg
          width="50"
          height="50"
          viewBox="0 0 303 303"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shadow-xl rounded-xl"
        >
          <rect width="303" height="303" rx="72" fill="#6650F2" />
          <path
            d="M147 92L206.293 151.293C206.683 151.683 206.683 152.317 206.293 152.707L147 212"
            stroke="white"
            strokeWidth="42"
            strokeLinecap="round"
          />
          <circle cx="118" cy="152" r="22" fill="white" />
        </svg>
        <div className="flex flex-col ml-3">
          <h1 className="text-xl font-semibold text-center">
            Регистрация бизнеса
          </h1>
          <p className="text-sm text-gray-500 flex justify-center items-center">
            Создайте учетную запись для начала
          </p>
        </div>
      </div>
      <div className="w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="display_name">Название бизнеса</Label>
            <Input
              id="display_name"
              name="display_name"
              required
              placeholder="Asyl Food"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">ID бизнеса</Label>
            <Input id="name" name="name" required placeholder="asylfood" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone_number">Контактный номер</Label>
            <PhoneInputAuth name="phone_number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagram">Ваш instagram</Label>
            <Input
              id="instagram"
              name="instagram"
              required
              placeholder="https://www.instagram.com/your_instagram/"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Адрес</Label>
            <Input
              id="address"
              name="address"
              required
              placeholder="Адрес бизнеса"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              name="description"
              required
              placeholder="Описание для бизнеса"
            />
          </div>

          {/* Hidden Input field */}
          <input type="hidden" name="color" value={selectedColor} />

          {/* Color Picker Modal */}
          <div className="space-y-2">
            <ColorPickerModal
              name="color"
              label="Выберите цвет"
              trigger="Выбрать акцент"
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
            />
          </div>
          <Separator className="my-6" />

          <Button type="submit" className="w-full">
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  );
}
