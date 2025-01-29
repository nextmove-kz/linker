import React from "react";
import EmojiSad from "./svg/EmojiSad";
import EmojiNormal from "./svg/EmojiNormal";
import VectorDown from "./svg/VectorDown";
import CloseCircle from "./svg/CloseCircle";
import VectorUp from "./svg/VectorUp";
import CheckMark from "./svg/CheckMark";

import BadMessage from "./svg/BadMessage";
import GoodMessage from "./svg/GoodMessage";
import Notification from "./svg/Notification";
import LinkerVector from "./svg/LinkerVector";
import LikeVector from "./svg/LikeVector";

const Advantages = () => {
  return (
    <div className="flex justify-center flex-col gap-10">
      <div className="flex flex-col space-y-5 items-center ">
        <p className="bg-violet100 text-primary shadow-none px-8 py-3 rounded-full">
          Преимущества
        </p>
        <h1 className="text-title font-bold font-rubik uppercase">
          Занимайтесь тем, что вам нравится
        </h1>
      </div>

      <div className="grid desktop:grid-cols-2 grid-cols-1 gap-5 ">
        <div className="border-borderColor border-2 w-full p-6 flex flex-col gap-8 rounded-2xl justify-between">
          <div className="flex justify-between h-1/2">
            <div className="flex flex-col justify-between">
              <h1 className="text-title font-rubik font-bold text-darkGray w-3/4">
                До появления Linker
              </h1>
              <p className="text-gray">Автоматизированно</p>
              <div className="flex items-center gap-4">
                <p className="text-orange text-[48px] font-bold font-rubik">
                  ~ 10%
                </p>
                <VectorDown></VectorDown>
              </div>
            </div>
            <div className="w-1/2 flex relative">
              <div className="absolute flex w-1/3 -left-7 -top-2">
                <Notification></Notification>
              </div>
              <BadMessage></BadMessage>
            </div>
          </div>

          <div className="flex tablet:flex-row flex-col justify-between tablet:gap-12 gap-4">
            <div className="flex flex-col justify-between items-start gap-4">
              <div className="flex justify-between items-center gap-2">
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <CloseCircle></CloseCircle>
                </div>
                <p className="text-darkGray text-base">
                  4 -6 часов на обработку заказов в день
                </p>
              </div>
              <div className="flex justify-between items-center gap-2">
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <CloseCircle></CloseCircle>
                </div>
                <p className="text-darkGray text-base">
                  15-20 сообщений на один заказ
                </p>
              </div>
            </div>
            <div className="flex flex-col  justify-between items-start gap-4">
              <div className="flex justify-between items-center gap-2">
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <CloseCircle></CloseCircle>
                </div>
                <p className="text-darkGray text-base">
                  Ручной сбор информации и деталей заказа
                </p>
              </div>
              <div className="flex justify-between items-center gap-2">
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <CloseCircle></CloseCircle>
                </div>
                <p className="text-darkGray text-base">
                  Упущенные клиенты из-за долгого ответа
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-end gap-2 justify-center">
            <EmojiSad></EmojiSad>
            <p className="text-orange text-xl w-1/3">
              Распыляетесь на переписки
            </p>
          </div>
        </div>
        <div className="bg-primary w-full flex flex-col rounded-2xl gap-8 p-6 justify-between">
          <div className="flex justify-between h-1/2">
            <div className="flex flex-col justify-between">
              <div className="flex items-center relative">
                <h1 className="text-title font-rubik font-bold text-white w-3/4">
                  Вместе с Linker
                </h1>
                <div className="absolute -right-4">
                  <LinkerVector></LinkerVector>
                </div>
              </div>
              <p className="text-white">Автоматизированно</p>
              <div className="flex items-center gap-4">
                <p className="text-white text-[48px] font-bold font-rubik">
                  ~ 90%
                </p>
                <VectorUp></VectorUp>
              </div>
            </div>
            <div className="flex w-1/2 relative">
              <div className="absolute flex w-1/3 -right-7 -top-2">
                <LikeVector></LikeVector>
              </div>
              <GoodMessage></GoodMessage>
            </div>
          </div>
          <div className="flex tablet:flex-row flex-col justify-between tablet:gap-12 gap-4">
            <div className="flex flex-col gap-4 justify-between items-start">
              <div className="flex justify-between items-center gap-2">
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <CheckMark></CheckMark>
                </div>
                <p className="text-white text-base">
                  15 минут на подключение сервиса
                </p>
              </div>
              <div className="flex justify-between items-center gap-2">
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <CheckMark></CheckMark>
                </div>
                <p className="text-white text-base">
                  Автоматический сбор заказов через форму
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-between items-start">
              <div className="flex justify-between items-center gap-2">
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <CheckMark></CheckMark>
                </div>
                <p className="text-white text-base">
                  Встроенная система онлайн оплаты
                </p>
              </div>
              <div className="flex justify-between items-center gap-2">
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <CheckMark></CheckMark>
                </div>
                <p className="text-white text-base">
                  Уведомления в привычных мессенджерах
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-end gap-2 justify-center">
            <EmojiNormal></EmojiNormal>
            <p className="text-white text-xl w-1/3">
              Сфокусированы на продукте
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <p className="text-md text-gray">
          *Мы ценим, что Instagram автоматизирует 10% бизнеса, но мы можем
          сделать лучше
        </p>
      </div>
    </div>
  );
};

export default Advantages;
