"use client";

//TODO: доделать страницу регистрации(использовать server action)
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HexColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import clientPocketBase from "@/api/client_pb";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import PhoneInput from "@/components/formFields/phone/PhoneInput";
import ColorPicker from "@/components/onboarding/ColorPicker";
import ColorPickerModal from "@/components/onboarding/ColorPickerModal";
import { Textarea } from "@/components/ui/textarea";
import { BusinessResponse } from "../../../../api/api_types";
import PhoneInputAuth from "@/components/onboarding/PhoneInputAuth";

export default function SignupForm() {
  const businessID = useParams().business;
  const [selectedColor, setSelectedColor] = useState("#7b39ed");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);
      console.log("POPOOPOPOPOPOPOPOPOPOPOPPO", data);

      const businessResponse = await clientPocketBase
        .collection("business")
        .update(businessID as string, {
          name: data.name,
          display_name: data.display_name,
          phone_number: data.phone_number,
          instagram: data.instagram,
          address: data.address,
          description: data.description,
          color: selectedColor,
        });

      console.log("dasdfaf", businessResponse);
    } catch (error) {
      console.error("Error during registration:", error);
      throw new Error("Registration failed");
    }
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
