import React from "react";
import Socials2 from "../svg/Socials2";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Vector from "./svg/Vector";
import Ellipse from "./svg/Ellipse";

const Questions = () => {
  return (
    <div className="rounded-3xl tablet:p-10 p-5 bg-darkGray flex justify-between gap-5 flex-col desktop:flex-row relative">
      <div className="absolute top-0 left-0">
        <Vector></Vector>
      </div>
      <div className="absolute bottom-0 right-0">
        <Ellipse></Ellipse>
      </div>
      <div className="flex flex-col justify-between desktop:w-2/5 gap-20 w-full z-50">
        <div>
          <h1 className="text-white text-title font-rubik font-bold uppercase">
            <span className="text-primary">Остались вопросы?</span> Получите
            ответ от разработчиков linker!
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <Socials2></Socials2>
          <p className="text-white text-base">Или свяжитесь с нами напрямую</p>
        </div>
      </div>
      <div className="flex flex-col items-center desktop:items-start desktop:w-1/2 w-full z-50">
        <div className="flex flex-col gap-5 tablet:w-2/3 w-full">
          <h1 className="text-white text-xl">
            Наш специалист ответит на все вопросы и поможет с подключением
          </h1>
          <Input placeholder="Имя" className="bg-white p-6"></Input>
          <Input
            placeholder="+7(___)___ __ __"
            className="bg-white p-6"
          ></Input>
          <Button className="font-bold font-rubik p-6">
            Получить консультацию
          </Button>
          <p className="text-xs text-white">
            Нажимая кнопку «Получить консультацию», вы соглашаетесь на условия
            обработки персональных данных
          </p>
        </div>
      </div>
    </div>
  );
};

export default Questions;
