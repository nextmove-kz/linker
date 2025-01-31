import React from "react";
import Logo from "./svg/Logo";
import Link from "next/link";
import SignIn from "./svg/SignIn";
import Sidebar from "../Sidebar";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center ">
      <Logo></Logo>
      <div className="desktop:flex hidden justify-between w-7/12">
        <Link href={"#advantages"} className="text-gray">
          Преимущества
        </Link>
        <Link href={"#aboutProject"} className="text-gray">
          О проекте
        </Link>
        <Link href={"#forwhom"} className="text-gray">
          Кому подойдет
        </Link>
        <Link href={"#price"} className="text-gray">
          Cтоимость
        </Link>
        <Link href={"#questions"} className="text-gray">
          Контакты
        </Link>
      </div>
      <Link href={"#"} className="desktop:flex hidden">
        <SignIn></SignIn>
      </Link>
      <div className="desktop:hidden flex items-center justify-center z-50">
        <Sidebar></Sidebar>
      </div>
    </div>
  );
};

export default Navbar;
