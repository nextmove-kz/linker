"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Vector from "./svg/Vector";
import Ellipse from "./svg/Ellipse";
import Telegram from "./svg/Telegram";
import Instagram from "./svg/Instagram";
import Gmail from "./svg/Gmail";
import Link from "next/link";
import PhoneInput from "@/components/formFields/phone/PhoneInput";
import clientPocketBase from "@/api/client_pb";
import { toast } from "sonner";
import { notifyFounders } from "@/api/whatsapp/notifications";
import { Send } from "lucide-react";
import Spin from "../price/svg/Spin";

const Questions = () => {
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);

    const formData = new FormData(e.currentTarget);
    const userName = formData.get("name") as string;
    try {
      const data = Object.fromEntries(formData.entries());
      console.log(data);

      await clientPocketBase.collection("landing_users").create({
        name: data.name,
        phone: data.user_phone,
        consult_type: "question",
      });

      await notifyFounders({
        consult_type: "Вопрос от клиента",
        name: data.name || "Не указано",
        phone: data.user_phone || "Не указано",
        business_name: "Не указано",
        email: "Не указано",
        tariff: "Не указано",
      });

      setDisabled(false);
    } catch (error) {
      toast.error("Непредвиденная ошибка", {
        description:
          "Пожалуйста свяжитесь с нами по адресу lukivan888@gmail.com",
      });
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
    <div
      className="rounded-3xl tablet:p-10 p-5 bg-darkGray flex justify-between gap-5 flex-col desktop:flex-row relative desktop:scroll-m-8 scroll-m-32"
      id="questions"
    >
      <div className="absolute top-0 z-10 left-0">
        <Vector></Vector>
      </div>
      <div className="absolute bottom-0 z-10 right-0">
        <Ellipse></Ellipse>
      </div>
      <div className="flex flex-col justify-between desktop:w-2/5 gap-20 w-full z-40">
        <div>
          <h1 className="text-white sm:text-[20px] tablet:text-[28px] desktop:text-title font-rubik font-bold uppercase">
            <span className="text-primary">Остались вопросы?</span> Получите
            ответ от разработчиков linker!
          </h1>
        </div>
        <div className="flex-col gap-2 desktop:flex hidden">
          <div className="flex gap-4">
            <Link href={"https://t.me/lukivan8"}>
              <Telegram width={60} height={60}></Telegram>
            </Link>
            <Link
              href={"https://www.instagram.com/linkerkz?igsh=NzhheDVhNWNtNXQ2"}
            >
              <Instagram width={60} height={60}></Instagram>
            </Link>
            <Link href={"mailto:lukivan888@gmail.com"}>
              <Gmail width={60} height={60}></Gmail>
            </Link>
          </div>
          <p className="text-white text-base">Или свяжитесь с нами напрямую</p>
        </div>
      </div>
      <form
        className="flex flex-col items-start desktop:w-1/2 w-full z-40"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-5 tablet:w-2/3 w-full">
          <h1 className="text-white font-medium sm:text-base tablet:text-md desktop:text-xl font-manrope">
            Наш специалист ответит на все вопросы и поможет с подключением
          </h1>
          <Input
            required
            placeholder="Имя"
            name="name"
            className="bg-white p-6"
          ></Input>
          <PhoneInput name={"user"} bg="white" padding={6} />
          {!disabled ? (
            <Button
              type="submit"
              className="font-bold font-rubik uppercase text-base p-6"
            >
              Получить консультацию
            </Button>
          ) : (
            <Button disabled>
              <Spin></Spin>
              Загрузка…
            </Button>
          )}
          <p className="text-xs text-white font-manrope">
            Нажимая кнопку «Получить консультацию», вы соглашаетесь на условия
            обработки персональных данных
          </p>
        </div>
      </form>
      <div className="flex-col gap-2 desktop:hidden flex z-40">
        <div className="flex gap-4">
          <Link href={"https://t.me/lukivan8"}>
            <Telegram width={60} height={60}></Telegram>
          </Link>
          <Link
            href={"https://www.instagram.com/linkerkz?igsh=NzhheDVhNWNtNXQ2"}
          >
            <Instagram width={60} height={60}></Instagram>
          </Link>
          <Link href={"mailto:lukivan888@gmail.com"}>
            <Gmail width={60} height={60}></Gmail>
          </Link>
        </div>
        <p className="text-white font-medium sm:text-base tablet:text-md desktop:text-[20px] font-manrope">
          Или свяжитесь с нами напрямую
        </p>
      </div>
    </div>
  );
};

export default Questions;
