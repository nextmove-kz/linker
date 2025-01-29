import React from "react";
import Clock1 from "./svg/clock/Clock1";
import { Card } from "@/components/ui/card";
import Clock2 from "./svg/clock/Clock2";
import Clock3 from "./svg/clock/Clock3";
import Arrow from "./svg/arrow/Arrow";
import Clock4 from "./svg/clock/Clock4";
import Clock5 from "./svg/clock/Clock5";
import { Button } from "@/components/ui/button";
import LinkerVector from "./svg/LinkerVector";
import FinalArrow from "./svg/arrow/FinalArrow";
import LinkerLogo from "./svg/LinkerLogo";

const Roadmap = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div className="flex flex-col items-center gap-5">
        <p className="bg-violet100 text-primary shadow-none px-8 py-3 w-[280px] rounded-full">
          5 шагов для работы с Linker
        </p>
        <div className="text-center">
          <h1 className="uppercase text-darkGray font-rubik text-title font-bold">
            Создайте профессиональный сайт
          </h1>
          <h1 className="uppercase text-darkGray font-rubik text-title font-bold">
            для приема заказов <span className="text-orange">за 15 минут</span>
          </h1>
        </div>
      </div>
      <div className="flex flex-wrap w-full items-center">
        <div className="flex items-center gap-6 w-1/3">
          <Card className="px-6 py-8">
            <div className="flex flex-col relative">
              <h1 className="uppercase text-primary text-title font-bold">
                01
              </h1>
              <p className="font-bold text-xl">Регистрация</p>
              <div className="absolute right-0 -top-4">
                <Clock1></Clock1>
              </div>
            </div>
            <p className="text-gray text-base">
              Укажите название бизнеса, цвет бренда и контактный телефон
            </p>
          </Card>
          <div className="col-span-1">
            <Arrow></Arrow>
          </div>
        </div>
        <div className="flex items-center gap-6 w-1/3">
          <Card className="px-6 py-8 ">
            <div className="flex flex-col relative">
              <h1 className="uppercase text-primary text-title font-bold">
                02
              </h1>
              <p className="font-bold text-xl">Выбор шаблона</p>
              <div className="absolute right-0 -top-4">
                <Clock2></Clock2>
              </div>
            </div>
            <p className="text-gray text-base">
              Подберите готовое решение для вашего бизнеса
            </p>
          </Card>
          <div className="col-span-1 hidden desktop:flex">
            <Arrow></Arrow>
          </div>
        </div>
        <div className="flex items-center gap-6 w-1/3">
          <Card className="px-6 py-8">
            <div className="flex flex-col relative">
              <h1 className="uppercase text-primary text-title font-bold">
                03
              </h1>
              <p className="font-bold text-xl">Добавление товаров</p>
              <div className="absolute right-0 -top-4">
                <Clock3></Clock3>
              </div>
            </div>
            <p className="text-gray text-base">
              Загрузите товары в каталог через удобный интерфейс
            </p>
          </Card>
          <div className="">
            <Arrow></Arrow>
          </div>
        </div>
        <div className="flex items-center gap-6 w-1/3">
          <Card className="px-6 py-8 ">
            <div className="flex flex-col relative">
              <h1 className="uppercase text-primary text-title font-bold">
                04
              </h1>
              <p className="font-bold text-xl">Настройка формы заказа</p>
              <div className="absolute right-0 -top-4">
                <Clock4></Clock4>
              </div>
            </div>
            <p className="text-gray text-base">
              Скорректируйте форму и выберите способы оплаты
            </p>
          </Card>
          <div className="col-span-1 hidden desktop:flex">
            <Arrow></Arrow>
          </div>
        </div>
        <div className="flex items-center gap-6 w-1/3">
          <Card className="px-6 py-8 ">
            <div className="flex flex-col relative">
              <h1 className="uppercase text-primary text-title font-bold">
                05
              </h1>
              <p className="font-bold text-xl">Оплата</p>
              <div className="absolute right-0 -top-4">
                <Clock5></Clock5>
              </div>
            </div>
            <p className="text-gray text-base">
              Оплатите подписку и получите личную ссылку для инстаграм био
            </p>
          </Card>
          <div className="">
            <FinalArrow></FinalArrow>
          </div>
        </div>
        <Card className="px-6 py-8 bg-darkGray  flex flex-col gap-3 w-1/3">
          <div className="flex flex-col relative">
            <p className="font-bold text-white text-xl">
              Попробуйте прямо сейчас
            </p>
            <div className="absolute right-0 -top-4">
              <LinkerVector></LinkerVector>
            </div>
          </div>
          <div>
            <p className="text-white text-base">
              Все возможности сервиса в бесплатной демо-версии
            </p>
          </div>
          <Button className="w-fit flex items-center group relative font-bold text-base font-rubik uppercase text-white py-5">
            Начать
            <span className="transform transition-transform duration-300 group-hover:translate-x-2">
              <LinkerLogo bg={false}></LinkerLogo>
            </span>
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Roadmap;
