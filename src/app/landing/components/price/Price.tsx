"use client";
import { Button } from "@/components/ui/button";
import CheckCircle from "../svg/CheckCircle";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Star from "../svg/Star";
import Ellipse from "./svg/Ellipse";
import Square from "./svg/Square";
import { use, useState } from "react";
const Price = () => {
  const [choose, setChoose] = useState(0);

  const planChange = (value: string) => {
    setChoose(value === "price1" ? 0 : 1);
  };
  return (
    <div className="bg-primary rounded-3xl p-10 flex gap-10 justify-between flex-col relative">
      <div className="absolute top-0 left-0">
        <Ellipse></Ellipse>
      </div>
      <div className="absolute right-0 top-0  ">
        <Square></Square>
      </div>
      <div className="flex flex-col gap-4">
        <p className="bg-violet100 text-primary shadow-none px-8 py-3 w-[126px] rounded-full">
          Тарифы
        </p>
        <h1 className="text-white font-bold text-title font-rubik uppercase">
          Лучшая цена для каждого бизнеса
        </h1>
        <div>
          <p className="text-base text-white">
            Никаких сложных тарифных сеток и скрытых условий. Выберите
            подходящий вариант и начните
          </p>
          <p className="text-base text-white">
            экономить время уже сегодня - доступ ко всем функциям включен в
            каждый тариф
          </p>
        </div>
      </div>
      <div className="bg-white p-10 rounded-2xl flex flex-col desktop:flex-row gap-10 justify-between">
        <div className="flex w-full desktop:w-fit justify-center desktop:justify-start">
          <div className="flex flex-col justify-between gap-4">
            <div className="flex gap-1 items-center">
              <div className="w-[24px] h-[24px] flex justify-center items-center">
                <CheckCircle />
              </div>
              <p className="text-darkGray text-md">
                Встроенная система онлайн оплаты
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <div className="w-[24px] h-[24px] flex justify-center items-center">
                <CheckCircle />
              </div>
              <p>Настраиваемые формы заказа под ваш бизнес</p>
            </div>
            <div className="flex gap-1 items-center">
              <div className="w-[24px] h-[24px] flex justify-center items-center">
                <CheckCircle />
              </div>
              <p className="text-darkGray text-md">
                Автоматический сбор заказов через форму
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <div className="w-[24px] h-[24px] flex justify-center items-center">
                <CheckCircle />
              </div>
              <p className="text-darkGray text-md">
                Мгновенные уведомления о заказе
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <div className="w-[24px] h-[24px] flex justify-center items-center">
                <CheckCircle />
              </div>
              <p className="text-darkGray text-md">
                Регулярные обновления и новые функции
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <div className="w-[24px] h-[24px] flex justify-center items-center">
                <CheckCircle />
              </div>
              <p className="text-darkGray text-md">
                Автоматический сбор контактов клиентов
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <div className="w-[24px] h-[24px] flex justify-center items-center">
                <CheckCircle />
              </div>
              <p className="text-darkGray text-md">
                Прямая связь с разработчиками проекта
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 desktop:w-7/12 w-full">
          <RadioGroup
            className="flex flex-col gap-10"
            defaultValue={choose === 0 ? "price1" : "price2"}
            onValueChange={planChange}
          >
            <Label
              htmlFor="price1"
              className={`rounded-xl border-2 py-8 px-6 gap-10 flex tablet:flex-row flex-col items-center justify-between ${
                choose === 0 ? "border-primary" : "border-borderColor"
              }`}
            >
              <div className="flex items-center gap-5">
                <RadioGroupItem
                  value="price1"
                  id="price1"
                  className="hidden tablet:flex"
                />
                <h1 className="uppercase tablet:text-price sm:text-xl text-md">
                  Основной
                </h1>
              </div>
              <div className="flex items-center gap-1">
                <h1 className="font-bold font-rubik text-xl sm:text-[28px] tablet:text-title">
                  17 000 ₸
                </h1>
                <p className="text-gray text-md">/месяц</p>
              </div>
            </Label>
            <Label
              htmlFor="price2"
              className={`relative rounded-xl border-2 py-7 px-6 gap-10 flex tablet:flex-row flex-col items-center justify-between ${
                choose === 1 ? "border-primary" : "border-borderColor"
              }`}
            >
              <div className="absolute flex gap-2 items-center bg-white p-3 right-0 -top-9 rotate-3 shadow-md rounded-xl">
                <Star></Star>
                <p className="text-orange uppercase text-base">
                  Осталось 34/50 мест
                </p>
              </div>
              <div className="flex items-center gap-5">
                <RadioGroupItem
                  value="price2"
                  id="price2"
                  className="hidden tablet:flex"
                />
                <div className="flex flex-col gap-1">
                  <h1 className="uppercase tablet:text-price sm:text-xl text-md">
                    Навсегда
                  </h1>
                  <h1 className="text-base text-primary">
                    *Окупается за 8 месяцев
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <h1 className="font-bold font-rubik text-xl sm:text-[28px] tablet:text-title">
                  150 000 ₸
                </h1>
                <p className="text-gray text-md">/безлимит</p>
              </div>
            </Label>
          </RadioGroup>
          <div className="flex justify-end">
            <Button className="w-fit px-10 py-7 text-base font-bold font-rubik text-white uppercase">
              Подключить Linker
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;
