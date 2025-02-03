import Image from "next/image";
import React from "react";
import Step1 from "./forwhom/Step1";
import FinalArrow from "./svg/arrow/FinalArrow";
import Step2 from "./forwhom/Step2";
import Step3 from "./forwhom/Step3";
import Step4 from "./forwhom/Step4";

const Forwhom = () => {
  return (
    <div
      className="flex justify-center flex-col gap-10 desktop:scroll-m-8 scroll-m-32"
      id="forwhom"
    >
      <div className="flex flex-col gap-5 items-center">
        <p className="bg-violet100 text-primary shadow-none px-8 py-3  rounded-full">
          Для кого
        </p>
        <div className="flex flex-col items-center">
          <p className="uppercase desktop:text-title tablet:text-[28px] sm:text-[20px] text-center tablet:w-2/3 w-full font-rubik font-bold text-darkGray">
            Профессиональная платформа для тех,
            <span className="text-orange"> кто продает в Instagram</span>
          </p>
        </div>
        <div className="text-center w-full flex justify-center">
          <p className="text-gray font-manrope font-medium sm:text-[14px] tablet:text-[16px] desktop:text-md tablet:w-2/3 w-full">
            Решаем проблему ручного приёма заказов и экономим время для тех, кто
            продаёт свои товары или изделия в Instagram и управляет бизнесом в
            одиночку
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 items-start justify-center gap-6">
        <div className="flex w-full flex-col gap-3">
          <Image
            src={"/images/forwhom_image1.png"}
            alt={"Image 1"}
            width={300}
            height={300}
            className="rounded-md w-full h-full object-cover"
          ></Image>
          <div>
            <h1 className="font-bold font-manrope text-md tablet:text-xl text-darkGray">
              Подарки
            </h1>
            <p className="text-gray sm:text-[14px] desktop:text-base font-manrope font-medium">
              Свечи, шопперы, клубника в шоколаде, упаковка подарков,
              интерьерные украшения
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Image
            src={"/images/forwhom_image2.png"}
            alt={"Image 3"}
            width={300}
            height={300}
            className="rounded-md w-full h-full object-cover"
          ></Image>
          <div>
            <h1 className="font-bold font-manrope text-md tablet:text-xl text-darkGray">
              Аксессуары и декор
            </h1>
            <p className="text-gray sm:text-[14px] desktop:text-base font-manrope font-medium">
              Керамика, украшения, аксессуары из бисера, текстиля и других
              материалов
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Image
            src={"/images/forwhom_image3.png"}
            alt={"Image 3"}
            width={300}
            height={300}
            className="rounded-md  w-full h-full object-cover"
          ></Image>
          <div>
            <h1 className="font-bold font-manrope text-md tablet:text-xl text-darkGray">
              Кулинария
            </h1>
            <p className="text-gray sm:text-[14px] desktop:text-base font-manrope font-medium">
              Торты, пирожные, десерты ручной работы
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Image
            src={"/images/forwhom_image4.png"}
            alt={"Image 4"}
            width={300}
            height={300}
            className="rounded-md w-full h-full object-cover"
          ></Image>
          <div>
            <h1 className="font-bold font-manrope text-md tablet:text-xl text-darkGray">
              Косметика и многое другое
            </h1>
            <p className="text-gray sm:text-[14px] desktop:text-base font-manrope font-medium">
              Мыло, бомбочки для ванн, крема, а также другие крафтовые товары
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="text-md tablet:text-xl text-darkGray desktop:justify-start justify-center font-bold flex font-manrope">
          Как это работает?
        </h1>
        <div className="flex desktop:items-stretch items-center justify-between w-full desktop:flex-row flex-col gap-14">
          <div className="bg-violet100 flex gap-3 p-4 rounded-xl desktop:w-1/4 tablet:w-3/5 w-full  items-center">
            <div className="h-[48px] w-[48px] flex justify-center items-center">
              <Step1 />
            </div>
            <div>
              <p className="text-darkGray text-base tablet:text-md font-manrope font-medium">
                Клиенты переходят по вашей уникальной ссылке
              </p>
            </div>
          </div>
          <div className="desktop:rotate-0 rotate-90 desktop:h-full desktop:my-auto">
            <FinalArrow />
          </div>
          <div className="bg-violet100 flex gap-3 p-4 rounded-xl desktop:w-1/4 tablet:w-3/5 w-full  items-center">
            <div className="h-[48px] w-[48px] flex justify-center items-center">
              <Step2 />
            </div>
            <div>
              <p className="text-darkGray text-base tablet:text-md font-manrope font-medium">
                Выбирают товары, оплачивают заказ
              </p>
            </div>
          </div>
          <div className="desktop:rotate-0 rotate-90 desktop:h-full desktop:my-auto">
            <FinalArrow />
          </div>
          <div className="bg-violet100 flex gap-3 p-4 rounded-xl desktop:w-1/4 tablet:w-3/5 w-full items-center">
            <div className="h-[48px] w-[48px] flex justify-center items-center">
              <Step3 />
            </div>
            <div>
              <p className="text-darkGray text-base tablet:text-md font-manrope font-medium">
                Вы занимаетесь оформлением и отправкой
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full desktop:justify-end justify-center">
          <div className="flex items-center gap-3  desktop:w-1/4 tablet:w-1/2 w-3/4">
            <div className="h-[32px] w-[32px] flex justify-center items-center">
              <Step4 />
            </div>
            <p className="text-base text-gray font-manrope font-medium">
              Делайте то, что любите, а заботу о клиентах доверьте Linker
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forwhom;
