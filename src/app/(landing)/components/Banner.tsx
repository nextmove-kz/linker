import { Button } from "@/components/ui/button";
import React from "react";
import Logo from "./svg/Logo";
import Link from "next/link";

const Banner = () => {
  return (
    <div className=" rounded-3xl tablet:p-10 p-5 bg-violet100">
      <div className="flex flex-col justify-center items-center h-full gap-4">
        <Logo></Logo>
        <h1 className="text-darkGray sm:text-[20px] tablet:text-[28px] desktop:text-title font-bold uppercase font-rubik">
          Доверьте заказы Linker
        </h1>
        <div className="tablet:w-2/3 w-full text-center">
          <p className="text-gray font-medium sm:text-[14px] tablet:text-md desktop:text-xl">
            Сфокусируйтесь на развитии бизнеса, а рутину оставьте Linker.
            Начните пользоваться сервисом уже сегодня и почувствуйте разницу
          </p>
        </div>
        <div className="flex desktop:w-1/2 gap-6 justify-center tablet:flex-row flex-col w-full">
          <Button
            variant={"outline"}
            asChild
            className="boder border-primary font-medium tablet:w-1/2 w-full  py-5 h-full  bg-violet100 hover:bg-primary hover:text-white font-rubik text-base text-primary"
          >
            <Link href={"/asylfood"}>Демо версия</Link>
          </Button>
          <Button className="uppercase tablet:w-1/2 w-full py-5 h-full font-rubik font-bold text-base text-white">
            Подключить Linker
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
