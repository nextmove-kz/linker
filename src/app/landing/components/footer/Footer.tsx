import { Separator } from "@/components/ui/separator";
import Socials from "../svg/Socials";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LinkerWhite from "../svg/LinkerWhite";
import Vector from "./svg/Vector";

const Footer = () => {
  return (
    <div className=" px-10 rounded-3xl p-10 bg-darkGray gap-20 flex flex-col justify-around relative">
      <div className="absolute bottom-0 right-0">
        <Vector></Vector>
      </div>
      <div className="flex justify-between gap-10 flex-wrap">
        <div className="flex tablet:flex-row flex-col desktop:w-1/2 justify-between w-full gap-4 tablet:gap-0">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <LinkerWhite></LinkerWhite>
              <p className="text-white sm:text-[14px] tablet:text-base">
                Автоматизация заказов из Instagram
              </p>
            </div>
            <div className="flex tablet:flex-row flex-col gap-5 items-start">
              <Socials></Socials>
              <div>
                <p className="text-white font-bold text-md">Напишите нам</p>
                <p className="text-white">lukivan888@gmail.com</p>
              </div>
            </div>
          </div>
          <Separator
            orientation="horizontal"
            className="bg-gray flex tablet:hidden"
          />
          <div className="flex gap-10 justify-start">
            <Separator
              orientation="vertical"
              className="bg-gray hidden tablet:flex"
            />
            <div className="flex flex-col gap-3 justify-center items-center">
              <div className="flex tablet:flex-col flex-row gap-2">
                <div className="flex flex-col gap-2">
                  <p className="text-white text-[14px] desktop:text-base">
                    Преимущества
                  </p>
                  <p className="text-white text-[14px] desktop:text-base">
                    О проекте
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-white text-[14px] desktop:text-base">
                    Кому подойдет
                  </p>
                  <p className="text-white text-[14px] desktop:text-base">
                    Стоимость
                  </p>
                </div>
              </div>
            </div>
            <Separator
              orientation="vertical"
              className=" bg-gray hidden desktop:flex"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 desktop:w-2/5 tablet:w-1/2 w-full z-50">
          <h1 className="text-white font-bold font-rubik text-[20px] tablet:text-[24px] uppercase">
            Будьте в курсе!
          </h1>
          <p className="text-white text-[14px] tablet:text-base">
            Подпишитесь на нашу рассылку, чтобы не пропускать новости и
            обновления
          </p>
          <div className="tablet:w-5/6 w-full flex flex-col gap-1">
            <div className="flex tablet:flex-row flex-col gap-2">
              <Input placeholder="E-mail" className="bg-white py-6"></Input>
              <Button className="font-bold font-rubik h-full py-4">
                Отправить
              </Button>
            </div>
            <p className="text-white text-[12px]">
              Нажимая кнопку «Отправить», вы соглашаетесь на условия обработки
              персональных данных
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-around text-white text-xs tablet:flex-row flex-col gap-3 tablet:gap-0 w-full text-center">
        <p>При поддержке КарТУ</p>
        <p>Политика конфиденциальности</p>
        <p>© Все права защищены. Linker.kz 2025</p>
      </div>
    </div>
  );
};

export default Footer;
