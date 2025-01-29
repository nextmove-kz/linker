import React from "react";
import Logo from "./svg/Logo";
import Link from "next/link";
import SignIn from "./svg/SignIn";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center ">
      <Logo></Logo>
      <div className="desktop:flex hidden justify-between w-7/12">
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
      <Link href={"#"} className="desktop:flex hidden">
        <SignIn></SignIn>
      </Link>
    </div>
  );
};

export default Navbar;
