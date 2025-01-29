import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import WomanBg from "./svg/WomanBg";
import Orders from "./svg/Orders";
import Heart from "./svg/Heart";
import Wallet from "./svg/Wallet";
import Like from "./svg/Like";
import Star from "./svg/Star";
import CheckMark from "../advantages/svg/CheckMark";
import CloseCircle from "../advantages/svg/CloseCircle";
import CheckCircle from "./svg/CheckCircle";
import LinkerLogo from "../svg/LinkerLogo";

Image;
const Hero = () => {
  return (
    <div className="flex desktop:flex-row flex-col desktop:justify-between desktop:gap-0 gap-10 items-center">
      <div className="flex flex-col desktop:w-1/2 gap-6 w-full">
        <div className="relative">
          <div className="absolute flex gap-2 items-center bg-white py-2 px-6 left-0 -top-12 -rotate-3 shadow-md rounded-xl">
            <p className="text-orange text-base font-bold">
              Экономим 1000+ часов в год
            </p>
          </div>
          <h1 className="desktop:text-[40px] tablet:text-[32px] sm:text-[24px] font-bold font-rubik uppercase">
            Автоматизируйте заказы в Instagram за
            <span className="text-orange"> 15 минут</span>
          </h1>
        </div>
        <p className="text-md text-gray">
          От 20 сообщений до потока готовых заказов за пару кликов. Принимайте
          заявки через удобную форму, получайте оплату онлайн и управляйте
          заказами в одном месте
        </p>
        <Button className="py-7 w-fit px-8 font-bold font-rubik uppercase group relative">
          <span className="flex items-center gap-2">
            Начать сейчас
            <span className="transform transition-transform duration-300 group-hover:translate-x-3">
              <LinkerLogo bg={false} />
            </span>
          </span>
        </Button>
      </div>

      <div className="w-1/2  flex justify-center">
        <div className="flex desktop:w-[470px] tablet:w-[400px] w-[300px] justify-start relative">
          <div className="flex justify-center items-center w-full relative">
            <div className="absolute z-50 bottom-6 left-0">
              <Orders></Orders>
            </div>

            <div className="absolute left-8 bottom-1/4 rotate-3">
              <Heart></Heart>
            </div>

            <div className="flex items-center absolute  rotate-6 -left-10 desktop:top-28 tablet:top-32 top-36 bg-white px-2 py-1 tablet:px-3 tablet:py-2  desktop:px-4 desktop:py-3 gap-1 z-30 shadow-lg rounded-2xl">
              <Wallet></Wallet>
              <div className="flex flex-col tablet:gap-1">
                <h1 className="font-rubik text-[12px]">Доступный баланс</h1>
                <h1 className="desktop:text-base tablet:text-[12px] text-[9px] font-rubik font-bold">
                  845 920 ₸
                </h1>
              </div>
            </div>

            <div className="absolute tablet:top-5 top-14 desktop:top-0 z-50 left-0 w-[60px] h-[60px] tablet:w-[77px] tablet:h-[77px] desktop:w-[100px] desktop:h-[100px]">
              <Image
                src={"/insta.png"}
                alt="gjkf"
                width={100}
                height={100}
              ></Image>
            </div>

            <div className="flex items-center absolute  bg-white -right-5 top-2/5 -rotate-6 px-2 py-1 tablet:px-3 tablet:py-2  desktop:px-4 desktop:py-3 gap-1 z-50 shadow-lg rounded-2xl">
              <CheckCircle></CheckCircle>
              <h1 className="desktop:text-base tablet:text-[12px] text-[9px] font-rubik font-bold">
                Заказ отправлен клиенту
              </h1>
            </div>
            <div className="absolute z-50 tablet:-right-16 -right-7 tablet:top-0 top-12">
              <Like></Like>
            </div>
            <div className="absolute z-50 tablet:-right-16 -right-9 tablet:bottom-10 bottom-7">
              <Star></Star>
            </div>
            <WomanBg></WomanBg>
            <Image
              width={485}
              height={515}
              src={"/woman.png"}
              alt="gkfj"
              className="absolute bottom-[18%] tablet:bottom-[13%] desktop:bottom-[7%] z-40 object-cover"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
