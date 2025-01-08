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
import { BusinessRecord, ProductsRecord, ShoppingBasketRecord} from "@/api/api_types";
import ShoppingCard from "./catalog/ShoppingCard";
import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";

export default function Branding() {
  const queryClient = useQueryClient()
  const { id } = useParams<{ id: string }>() 
  const [title, setTitle] = useState<string>();
  const getData = async () => {
    if (!id) {
      notFound();
    }
    try {
      const records = await clientPocketBase
        .collection("shoppingBasket")
        .getFullList<ShoppingBasketRecord>({ expand: "product" });

      const businesses = await clientPocketBase
        .collection("business")
        .getList<BusinessRecord>(1, 1, {
          filter: `name="${id}"`,
        });

      if (businesses.items.length > 0) {
        const business = businesses.items[0];
        setTitle(business.displayName || "Без названия");
      } else {
        setTitle("Бизнес не найден");
      }

      return { records, businesses };
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
      setTitle("Ошибка загрузки данных");
      throw error;
    }
  };
  
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['shoppingBasket', 'business', id],
    queryFn: getData,
  });
  
  return (
    <Dialog>
      <div className="flex items-center justify-between gap-2 text-3xl font-semibold p-4">
        <Link href="/">
          <ArrowLeft />
        </Link>
        <span className="max-w-full text-center flex-1 truncate">{title}</span>
        <DialogTrigger onClick={getData}>
          <ShoppingCart className="w-12" />
        </DialogTrigger>
        <DialogContent className="w-[300px]">
          <DialogHeader>
            <DialogTitle>Корзина</DialogTitle>
          </DialogHeader>
          {data != undefined && data.records.length > 0 ? (
            data.records.map((record) => {
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
