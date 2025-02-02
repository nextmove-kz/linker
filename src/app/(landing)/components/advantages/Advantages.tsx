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
    <div
      className="flex justify-center flex-col gap-10 desktop:scroll-m-8 scroll-m-32"
      id="advantages"
    >
      <div className="flex flex-col space-y-5 items-center ">
        <p className="bg-violet100 text-primary shadow-none px-8 py-3 rounded-full">
          Преимущества
        </p>
        <h1 className="text-[24px] tablet:text-[28px] desktop:text-title font-bold text-center font-rubik uppercase">
          Занимайтесь тем, что вам нравится
        </h1>
      </div>

      <div className="grid desktop:grid-cols-2 grid-cols-1 gap-5 ">
        <div className="border-borderColor border-2 w-full p-6 flex flex-col gap-8 rounded-2xl justify-between">
          <div className="flex tablet:flex-row flex-col justify-between h-1/2">
            <div className="flex flex-col justify-between">
              <h1 className="sm:text-[24px] tablet:text-[28px] desktop:text-title font-rubik font-bold text-darkGray w-3/4">
                До появления Linker
              </h1>
              <p className="text-gray font-bold font-manrope">
                Автоматизированно
              </p>
              <div className="flex items-center gap-4">
                <p className="text-orange sm:text-title desktop:text-[48px] font-bold font-rubik">
                  ~ 10%
                </p>
                <VectorDown></VectorDown>
              </div>
            </div>
            <div className="tablet:w-1/2 w-full justify-center flex relative">
              <div className="absolute flex w-1/4 -left-5 -top-2">
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
                <p className="text-darkGray sm:text-[14px] desktop:text-base font-manrope">
                  4 -6 часов на обработку заказов в день
                </p>
              </div>
              <div className="flex justify-between items-center gap-2">
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <CloseCircle></CloseCircle>
                </div>
                <p className="text-darkGray sm:text-[14px] desktop:text-base font-manrope">
                  15-20 сообщений на один заказ
                </p>
              </div>
            </div>
            <div className="flex flex-col  justify-between items-start gap-4">
              <div className="flex justify-between items-center gap-2">
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <CloseCircle></CloseCircle>
                </div>
                <p className="text-darkGray sm:text-[14px] desktop:text-base font-manrope">
                  Ручной сбор информации и деталей заказа
                </p>
              </div>
              <div className="flex justify-between items-center gap-2">
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <CloseCircle></CloseCircle>
                </div>
                <p className="text-darkGray sm:text-[14px] desktop:text-base font-manrope">
                  Упущенные клиенты из-за долгого ответа
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <div className="w-[40px] h-[40px] tablet:w-[60px] tablet:h-[60px] flex justify-center items-center">
              <EmojiSad></EmojiSad>
            </div>
            <p className="text-orange desktop:text-xl font-rubik font-medium tablet:text-[18px] sm:text-[16px] w-1/2 tablet:w-1/3">
              Распыляетесь на переписки
            </p>
          </div>
        </div>
        <div className="bg-primary w-full flex flex-col rounded-2xl gap-8 p-6 justify-between">
          <div className="flex tablet:flex-row flex-col justify-between h-1/2">
            <div className="flex flex-col justify-between">
              <div className="flex items-center relative">
                <h1 className="sm:text-[24px] tablet:text-[28px] desktop:text-title font-rubik font-bold text-white w-3/4">
                  Вместе с Linker
                </h1>
                <div className="absolute -right-4 -top-3">
                  <LinkerVector></LinkerVector>
                </div>
              </div>
              <p className="text-white font-bold font-manrope">
                Автоматизированно
              </p>
              <div className="flex items-center gap-4">
                <p className="text-white sm:text-title desktop:text-[48px] font-bold font-rubik">
                  ~ 90%
                </p>
                <VectorUp></VectorUp>
              </div>
            </div>
            <div className="flex tablet:w-1/2 w-full justify-center relative">
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
                <p className="text-white sm:text-[14px] desktop:text-base font-manrope">
                  15 минут на подключение сервиса
                </p>
              </div>
              <div className="flex justify-between items-center gap-2">
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <CheckMark></CheckMark>
                </div>
                <p className="text-white sm:text-[14px] desktop:text-base font-manrope">
                  Автоматический сбор заказов через форму
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-between items-start">
              <div className="flex justify-between items-center gap-2">
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <CheckMark></CheckMark>
                </div>
                <p className="text-white sm:text-[14px] desktop:text-base font-manrope">
                  Встроенная система онлайн оплаты
                </p>
              </div>
              <div className="flex justify-between items-center gap-2">
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <CheckMark></CheckMark>
                </div>
                <p className="text-white sm:text-[14px] desktop:text-base font-manrope">
                  Уведомления в привычных мессенджерах
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <div className="w-[40px] h-[40px] tablet:w-[60px] tablet:h-[60px] flex justify-center items-center">
              <EmojiNormal></EmojiNormal>
            </div>

            <p className="text-white desktop:text-xl font-rubik font-medium tablet:text-[18px] sm:text-[16px] w-1/2 tablet:w-1/3">
              Сфокусированы на продукте
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <p className="desktop:text-md tablet:text-[16px] text-center sm:text-[14px] text-gray">
          *Мы ценим, что Instagram автоматизирует 10% бизнеса, но мы можем
          сделать лучше
        </p>
      </div>
    </div>
  );
};

export default Advantages;
