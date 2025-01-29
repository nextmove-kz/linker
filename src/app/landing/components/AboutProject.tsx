import React from "react";
import iphone from "./images/iPhone 15 Pro White Titanium.png";
import Image from "next/image";
import Instagram from "./svg/Instagram";
import { Card } from "@/components/ui/card";
import ShoppingCart from "./svg/ShoppingCart";
import Wallet from "./svg/Wallet";
import Text from "./svg/Text";
import Bell from "./svg/Bell";

const AboutProject = () => {
  return (
    <div className="flex desktop:flex-row flex-col gap-5">
      <div className="desktop:w-6/12 sm:h-auto min-h-[600px] w-full bg-darkGray rounded-2xl relative p-7">
        <div>
          <p className="bg-violet100 text-primary shadow-none px-6 py-2  rounded-full w-fit">
            О проекте
          </p>
          <div>
            <p className="uppercase text-title font-rubik font-bold text-white">
              Linker — <span className="text-orange">лёгкий способ</span>{" "}
              управлять заказами в Instagram
            </p>
          </div>
        </div>
        <div className="absolute bottom-0">
          <div className="absolute -right-10 -top-24">
            <Instagram></Instagram>
          </div>
          <Image src={iphone} alt={"Image 3"} width={400} height={300}></Image>
        </div>
      </div>
      <div className="flex flex-col gap-10 desktop:w-2/3 w-full">
        <div className="flex justify-between gap-5 w-full">
          <Card className="p-5 w-1/2  flex flex-col gap-3">
            <ShoppingCart></ShoppingCart>
            <h1 className="text-xl font-bold text-darkGray">
              Каталог товаров/услуг
            </h1>
            <div>
              <p className="text-gray text-base">
                Со всеми стандартными функциями популярных сервисов доставки
              </p>
            </div>
          </Card>
          <Card className="p-5 w-1/2  flex flex-col gap-3">
            <Wallet></Wallet>
            <h1 className="text-xl font-bold text-darkGray">
              Гибкая система оплаты
            </h1>
            <div>
              <p className="text-gray text-base">
                Оплата онлайн картой или наличными
              </p>
            </div>
          </Card>
        </div>
        <div className="flex justify-between gap-5 w-full">
          <Card className="p-5 w-1/2  flex flex-col gap-3">
            <Text></Text>
            <div>
              <h1 className="text-xl font-bold text-darkGray">
                Настраиваемая форма заказа
              </h1>
            </div>
            <div>
              <p className="text-gray text-base">
                С набором предустановленных полей под специфику каждого бизнеса
              </p>
            </div>
          </Card>
          <Card className="p-5 w-1/2  flex flex-col gap-3">
            <Bell></Bell>
            <div>
              <h1 className="text-xl font-bold text-darkGray">
                Двойная система уведомлений о заказах
              </h1>
            </div>
            <div>
              <p className="text-gray text-base">
                В мессенджеры и личный кабинет с панелью управления заказами
              </p>
            </div>
          </Card>
        </div>
        <div className="w-full h-full bg-[url('/preview.jpg')] rounded-2xl bg-cover px-6 py-8 text-white">
          <p className="font-bold w-1/2">
            Всё это объединено в интуитивно понятный конструктор, не требующий
            технических навыков для настройки
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutProject;
