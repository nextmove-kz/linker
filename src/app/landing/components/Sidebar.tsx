"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./navbar/svg/Logo";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Socials2 from "./svg/Socials2";

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
          <Logo></Logo>
          <Separator />
          <div className="flex flex-col gap-5">
            <Link href={"#"} className="text-gray">
              Преимущества
            </Link>
            <Link href={"#"} className="text-gray">
              О проекте
            </Link>
            <Link href={"#"} className="text-gray">
              Кому подойдет
            </Link>
            <Link href={"#"} className="text-gray">
              Cтоимость
            </Link>
            <Link href={"#"} className="text-gray">
              Контакты
            </Link>
          </div>
          <h1 className="text-darkGray text-md font-bold">
            Прямая связь с разработчиками проекта
          </h1>
          <Socials2></Socials2>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
