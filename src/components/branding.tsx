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
import { ShoppingBasketRecord } from "@/api/api_types";

// Это не работает
const getData = async () => {
  const records = await clientPocketBase
    .collection("shoppingBasket")
    .getFullList<ShoppingBasketRecord>();
  console.log(records);
  return records;
};

export default function Branding({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center gap-2 text-3xl font-semibold p-4">
      <Link href="/">
        <ArrowLeft className="" />
      </Link>
      <span className="max-w-full text-center flex-1">{title}</span>

      <Dialog>
        <DialogTrigger onClick={getData}>
          <ShoppingCart className="w-12" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
