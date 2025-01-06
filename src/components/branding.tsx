"use client";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
import clientPocketBase from "@/api/client_pb";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductsRecord, ShoppingBasketRecord } from "@/api/api_types";
import ShoppingCard from "./catalog/ShoppingCard";
import { useState } from "react";

export default function Branding({ title }: { title: string }) {
  const [data, setData] = useState<ShoppingBasketRecord[]>();
  const getData = async () => {
    const records = await clientPocketBase
      .collection("shoppingBasket")
      .getFullList<ShoppingBasketRecord>({ expand: "product" });
    setData(records);
    return records;
  };
  return (
    <Dialog>
      <div className="flex mx-auto items-center justify-center gap-2 text-3xl font-semibold p-4">
        <Link href="/">
          <ArrowLeft />
        </Link>
        <span className="max-w-full text-center flex-1">{title}</span>

        <DialogTrigger onClick={getData}>
          <ShoppingCart className="w-12" />
        </DialogTrigger>
        <DialogContent className="w-[300px]">
          <DialogHeader>
            <DialogTitle>Корзина</DialogTitle>
          </DialogHeader>
          {data != undefined && data.length > 0 ? (
            data.map((record) => {
              return (
                <ShoppingCard
                  key={record.id}
                  product={record}
                  initialCount={record.amount}
                />
              );
            })
          ) : (
            <p>Нет данных</p>
          )}
        </DialogContent>
      </div>
    </Dialog>
  );
}
