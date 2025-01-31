"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./navbar/svg/Logo";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Socials2 from "./svg/Socials2";
import LinkerLogo from "./svg/LinkerLogo";
import Telegram from "./postQuestions/svg/Telegram";
import Instagram from "./postQuestions/svg/Instagram";
import Gmail from "./postQuestions/svg/Gmail";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <Button
        onClick={toggleSidebar}
        className="fixed top-4 right-4 z-50"
        variant="ghost"
        size="icon"
      >
        <Menu className="h-4 w-4 text-primary" />
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform rounded-l-2xl duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex flex-col gap-5">
          <div className="flex justify-end">
            <Button variant={"ghost"} onClick={toggleSidebar}>
              <X />
            </Button>
          </div>
          <div className="flex flex-col gap-5">
            <Link
              href={"#advantages"}
              className="text-gray"
              onClick={toggleSidebar}
            >
              Преимущества
            </Link>
            <Link
              href={"#aboutProject"}
              className="text-gray"
              onClick={toggleSidebar}
            >
              О проекте
            </Link>
            <Link
              href={"#forwhom"}
              className="text-gray"
              onClick={toggleSidebar}
            >
              Кому подойдет
            </Link>
            <Link href={"#price"} className="text-gray" onClick={toggleSidebar}>
              Cтоимость
            </Link>
            <Link
              href={"#questions"}
              className="text-gray"
              onClick={toggleSidebar}
            >
              Контакты
            </Link>
          </div>
          <h1 className="text-darkGray font-bold">
            Прямая связь с разработчиками проекта
          </h1>
          <div className="flex gap-4">
            <Link href={"https://t.me/lukivan8"}>
              <Telegram width={40} height={40}></Telegram>
            </Link>
            <Link
              href={"https://www.instagram.com/linkerkz?igsh=NzhheDVhNWNtNXQ2"}
            >
              <Instagram width={40} height={40}></Instagram>
            </Link>
            <Link href={"mailto:lukivan888@gmail.com"}>
              <Gmail width={40} height={40}></Gmail>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
