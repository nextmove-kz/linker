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
          <h1 className="uppercase text-darkGray font-rubik desktop:text-title tablet:text-[28px] text-[20px] font-bold">
            Создайте профессиональный сайт для приема заказов{" "}
            <span className="text-orange">за 15 минут</span>
          </h1>
        </div>
      </div>
      <div className="grid desktop:grid-cols-[1fr_65px_1fr_65px_1fr_65px] tablet:grid-cols-[1fr_65px_1fr] grid-cols-1 gap-4 w-full sm:items-center justify-between">
        <div className="flex items-center gap-6 w-full">
          <Card className="px-6 py-8 w-full tablet:w-auto">
            <div className="flex flex-col relative">
              <h1 className="uppercase text-primary text-title font-bold">
                01
              </h1>
              <p className="font-bold text-xl">Регистрация</p>
              <div className="absolute right-0 -top-4">
                <Clock1></Clock1>
              </div>
            </div>
            <p className="text-gray text-16px">
              Укажите название бизнеса, цвет бренда и контактный телефон
            </p>
          </Card>
        </div>
        <div className="flex justify-center">
          <Arrow></Arrow>
        </div>
        <div className="flex items-center gap-6 w-full">
          <Card className="px-6 py-8 w-full tablet:w-auto">
            <div className="flex flex-col relative">
              <h1 className="uppercase text-primary text-title font-bold">
                02
              </h1>
              <p className="font-bold text-xl">Выбор шаблона</p>
              <div className="absolute right-0 -top-4">
                <Clock2></Clock2>
              </div>
            </div>
            <p className="text-gray text-16px">
              Подберите готовое решение для вашего бизнеса
            </p>
          </Card>
        </div>
        <div className="flex tablet:hidden desktop:flex justify-center">
          <Arrow></Arrow>
        </div>
        <div className="flex items-center gap-6 w-full">
          <Card className="px-6 py-8 w-full tablet:w-auto">
            <div className="flex flex-col relative">
              <h1 className="uppercase text-primary text-title font-bold">
                03
              </h1>
              <p className="font-bold text-xl">Добавление товаров</p>
              <div className="absolute right-0 -top-4">
                <Clock3></Clock3>
              </div>
            </div>
            <p className="text-gray text-16px">
              Загрузите товары в каталог через удобный интерфейс
            </p>
          </Card>
        </div>
        <div className="flex justify-center">
          <Arrow></Arrow>
        </div>
        <div className="flex items-center gap-6 w-full">
          <Card className="px-6 py-8 w-full tablet:w-auto">
            <div className="flex flex-col relative">
              <h1 className="uppercase text-primary text-title font-bold">
                04
              </h1>
              <p className="font-bold text-xl">Настройка формы заказа</p>
              <div className="absolute right-0 -top-4">
                <Clock4></Clock4>
              </div>
            </div>
            <p className="text-gray text-16px">
              Скорректируйте форму и выберите способы оплаты
            </p>
          </Card>
        </div>
        <div className="col-span-1 flex tablet:hidden desktop:flex justify-center">
          <Arrow></Arrow>
        </div>
        <div className="flex items-center gap-6 w-full">
          <Card className="px-6 py-8 w-full tablet:w-auto">
            <div className="flex flex-col relative">
              <h1 className="uppercase text-primary text-title font-bold">
                05
              </h1>
              <p className="font-bold text-xl">Оплата</p>
              <div className="absolute right-0 -top-4">
                <Clock5></Clock5>
              </div>
            </div>
            <p className="text-gray text-16px">
              Оплатите подписку и получите личную ссылку для инстаграм био
            </p>
          </Card>
        </div>
        <div className="flex justify-center">
          <FinalArrow isRoadmap></FinalArrow>
        </div>
        <Card className="px-6 py-8 bg-darkGray  flex flex-col gap-3 w-full desktop:col-span-2">
          <div className="flex flex-col relative">
            <p className="font-bold text-white text-xl">
              Попробуйте прямо сейчас
            </p>
            <div className="absolute right-0 -top-4">
              <LinkerVector></LinkerVector>
            </div>
          </div>
          <div>
            <p className="text-white text-16px">
              Все возможности сервиса в бесплатной демо-версии
            </p>
          </div>
          <Button className="w-fit flex items-center group relative font-bold text-16px font-rubik uppercase text-white py-5">
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
