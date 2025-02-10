"use client";
import React from "react";
import Image from "next/image";
import Instagram from "./svg/Instagram";
import { Card } from "@/components/ui/card";
import ShoppingCart from "./svg/ShoppingCart";
import Wallet from "./svg/Wallet";
import Text from "./svg/Text";
import Bell from "./svg/Bell";
import { useEffect, useRef } from "react";

const AnimatedDiv = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const image = entry.target.querySelector("#imageId");
          const text = entry.target.querySelector("#animatedText");
          const badge = entry.target.querySelector("#animatedBadge");
          if (image && text && badge) {
            image.classList.add("animate-up-animation");
            text.classList.add("animate-left-animation");
            badge.classList.add("animate-down-animation");
          }
          observer.unobserve(entry.target);
        }
      },
      { threshold: 1.0 }
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={divRef}
      className="desktop:w-6/12 sm:h-auto min-h-[600px] w-full bg-darkGray rounded-2xl relative p-7 overflow-y-hidden"
    >
      <div className="flex flex-col gap-2">
        <p
          id="animatedBadge"
          className="bg-violet100 text-primary shadow-none px-6 py-2 rounded-full w-fit  -translate-y-24"
        >
          О проекте
        </p>
        <div id="animatedText" className="-translate-x-[500px]">
          <p className="uppercase sm:text-[20px] tablet:text-[28px] desktop:text-title font-rubik font-bold text-white">
            Linker — <span className="text-orange">лёгкий способ </span>
            управлять заказами в Instagram
          </p>
        </div>
      </div>
      <div className="absolute bottom-0">
        <div className="absolute tablet:right-28 right-2/3 w-[50px] -top-32">
          <Instagram></Instagram>
        </div>
        <Image
          id="imageId"
          src={"/images/iphone.png"}
          alt={"Image 3"}
          width={400}
          height={300}
          className="translate-y-72"
        />
      </div>
    </div>
  );
};
const AboutProject = () => {
  return (
    <div
      className="flex desktop:flex-row flex-col gap-5 desktop:scroll-m-8 scroll-m-32"
      id="aboutProject"
    >
      <AnimatedDiv></AnimatedDiv>
      <div className="flex flex-col gap-5 desktop:w-2/3 w-full">
        <div className="flex tablet:flex-row flex-col justify-between gap-5 w-full">
          <Card className="p-5 tablet:w-1/2 w-full  flex flex-col gap-3">
            <ShoppingCart></ShoppingCart>
            <h1 className="sm:text-[18px] font-manrope desktop:text-xl font-bold text-darkGray">
              Каталог товаров/услуг
            </h1>
            <div>
              <p className="text-gray sm:text-[14px] font-manrope font-medium desktop:text-base">
                Со всеми стандартными функциями популярных сервисов доставки
              </p>
            </div>
          </Card>
          <Card className="p-5 tablet:w-1/2 w-full  flex flex-col gap-3">
            <Wallet></Wallet>
            <h1 className="sm:text-[18px] desktop:text-xl font-bold font-manrope text-darkGray">
              Гибкая система оплаты
            </h1>
            <div>
              <p className="text-gray sm:text-[14px] font-manrope font-medium desktop:text-base">
                Оплата онлайн картой или наличными
              </p>
            </div>
          </Card>
        </div>
        <div className="flex tablet:flex-row flex-col justify-between gap-5 w-full">
          <Card className="p-5 tablet:w-1/2 w-full  flex flex-col gap-3">
            <Text></Text>
            <div>
              <h1 className="sm:text-[18px] desktop:text-xl font-bold text-darkGray font-manrope">
                Настраиваемая форма заказа
              </h1>
            </div>
            <div>
              <p className="text-gray sm:text-[14px] desktop:text-base font-manrope font-medium">
                С набором предустановленных полей под специфику каждого бизнеса
              </p>
            </div>
          </Card>
          <Card className="p-5 tablet:w-1/2 w-full  flex flex-col gap-3">
            <Bell></Bell>
            <div>
              <h1 className="sm:text-[18px] desktop:text-xl font-bold text-darkGray font-manrope">
                Двойная система уведомлений о заказах
              </h1>
            </div>
            <div>
              <p className="text-gray sm:text-[14px] desktop:text-base font-manrope font-medium">
                В мессенджеры и личный кабинет с панелью управления заказами
              </p>
            </div>
          </Card>
        </div>
        <div className="w-full h-full bg-[url('/images/preview.png')] rounded-2xl bg-cover bg-center px-6 py-8 text-white">
          <p className="font-bold font-manrope desktop:w-1/2 tablet:w-2/3 w-3/4">
            Всё это объединено в интуитивно понятный конструктор, не требующий
            технических навыков для настройки
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutProject;
