"use client";
import { LandingUsersTariffOptions } from "@/api/api_types";
import clientPocketBase from "@/api/client_pb";
import { notifyFounders } from "@/api/whatsapp/notifications";
import InputField from "@/components/formFields/FormInput";
import PhoneField from "@/components/formFields/phone/PhoneField";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import Spin from "./svg/Spin";
import { Send } from "lucide-react";

export default function FormDialog({
  variant,
  children,
}: {
  variant: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("Email_text") as string;
    const userName = formData.get("ФИО_text") as string;
    try {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error("Ошибка", {
          description: "Пожалуйста, введите корректный email",
        });
        return;
      }
      const data = Object.fromEntries(formData.entries());
      await clientPocketBase.collection("landing_users").create({
        name: data.ФИО_text,
        phone: data.Телефон_phone,
        tariff: variant === 0 ? "main" : "lifetime",
        email: data.Email_text,
        business_name: data.Организация_text,
        consult_type: "subscription",
      });

      await notifyFounders({
        consult_type: "Подключение подписки",
        name: data.ФИО_text || "Не указано",
        phone: data.Телефон_phone || "Не указано",
        business_name: data.Организация_text || "Не указано",
        email: data.Email_text || "Не указано",
        tariff: variant === 0 ? "Основной" : "Пожизненный",
      });
      setOpen(false);
      setDisabled(false);
    } catch (error) {
      toast.error("Непредвиденная ошибка", {
        description:
          "Пожалуйста свяжитесь с нами по адресу lukivan888@gmail.com",
      });
      setOpen(false);
      setDisabled(false);
      return;
    }

    toast.custom(
      () => (
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-lg p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-2">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-lg">
                Спасибо за запрос {userName}! ✨
              </p>
              <p className="text-purple-100 text-sm">
                Мы вам ответим в ближайшее время
              </p>
            </div>
          </div>
        </div>
      ),
      { duration: 5000 }
    );

    (e.target as HTMLFormElement).reset();
  };
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger
        onClick={() => {
          setOpen(true);
        }}
        asChild
      >
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent className="w-[350px] tablet:w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-center">
            Подключение {variant === 0 ? "основной" : "пожизненной"} подписки
          </AlertDialogTitle>
          <AlertDialogDescription>
            Работайте быстрее и удобнее с полным набором профессиональных
            инструментов. Попробуйте прямо сейчас.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form
          className="flex flex-col gap-4 w-full p-2 mx-auto"
          onSubmit={onSubmit}
        >
          <InputField required name="ФИО" placeholder="ФИО" />
          <InputField required name="Организация" />
          <InputField required name="Email" />
          <PhoneField required name="Телефон" />

          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setOpen(false);
              }}
            >
              Отменить
            </AlertDialogCancel>
            {!disabled ? (
              <AlertDialogAction type="submit">Подключить</AlertDialogAction>
            ) : (
              <Button disabled>
                <Spin></Spin>
                Загрузка…
              </Button>
            )}
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
