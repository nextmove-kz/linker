import { Button } from "@/components/ui/button";
import React from "react";
import Logo from "./svg/Logo";

const Banner = () => {
  return (
    <div className=" rounded-3xl tablet:p-10 p-5 bg-violet100">
      <div className="flex flex-col justify-center items-center h-full gap-4">
        <Logo></Logo>
        <h1 className="text-darkGray text-title font-bold uppercase font-rubik">
          Доверьте заказы Linker
        </h1>
        <div className="w-2/3 text-center">
          <p className="text-gray text-xl">
            Сфокусируйтесь на развитии бизнеса, а рутину оставьте Linker.
            Начните пользоваться сервисом уже сегодня и почувствуйте разницу
          </p>
        </div>
        <div className="flex tablet:w-1/3 gap-6 justify-center tablet:flex-row flex-col w-full">
          <Button
            variant={"outline"}
            className="boder border-primary font-medium w-full px-10 py-5 h-full  bg-violet100 hover:bg-primary hover:text-white font-rubik text-base text-primary"
          >
            Демо версия
          </Button>
          <Button className="uppercase w-full px-10 py-5 h-full font-rubik font-bold text-base text-white">
            Подключить Linker
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
