import Image from "next/image";
import React from "react";

const Orders = () => {
  return (
    <div className="bg-white rounded-2xl flex justify-center items-center flex-col p-3 gap-1 shadow-lg">
      <h1 className="text-base font-rubik font-bold">Заказы за сегодня</h1>
      <Image
        src={"/images/orders.png"}
        width={150}
        height={100}
        alt="jgfkj"
      ></Image>
    </div>
  );
};

export default Orders;
