"use client";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BusinessRecord, ShoppingBasketRecord } from "@/api/api_types";
import ShoppingCard from "./catalog/ShoppingCard";
import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useShoppingBasketQuery } from "@/hooks/useShoppingBasket";
import { Separator } from "./ui/separator";
import clientPocketBase from "@/api/client_pb";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function Branding() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState<string>();

  const { data, isLoading } = useShoppingBasketQuery(id);

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
        router.replace("/not-found");
      }

      return { records, businesses };
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
      setTitle("Ошибка загрузки данных");
      throw error;
    }
  };

  const { isError, error } = useQuery({
    queryKey: ["shoppingBasket", "business", id],
    queryFn: getData,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const totalItems =
    data?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
  const totalSum = data?.reduce(
    (sum, item) =>
      sum + (item.amount || 0) * (item.expand?.product?.price || 0),
    0
  );

  return (
    <Dialog
      onOpenChange={async (open: boolean) => {
        await queryClient.invalidateQueries({ queryKey: ["shoppingBasket"] });
        router.refresh();
      }}
    >
      <div className="flex mx-auto items-center justify-center gap-2 text-3xl font-semibold p-4">
        <Link href="/" className="w-12">
          <ArrowLeft />
        </Link>
        <span className="max-w-full text-center flex-1">{title}</span>
        <div className="flex relative py-2">
          <DialogTrigger>
            <ShoppingCart
              className={totalItems > 0 ? "w-12" : "w-12 opacity-30"}
            />
            {totalItems > 0 && (
              <div className="absolute right-0 top-0 select-none flex items-center justify-center bg-primary text-primary-foreground rounded-full h-5 w-5">
                <p className="text-sm leading-none text-center">{totalItems}</p>
              </div>
            )}
          </DialogTrigger>
        </div>
        <DialogContent className="w-[400px] rounded-sm">
          <DialogHeader>
            <DialogTitle>Корзина</DialogTitle>
          </DialogHeader>
          {isLoading ? (
            <p>Загрузка...</p>
          ) : data && data.length > 0 ? (
            data.map((record, index) => (
              <ShoppingCard
                key={record.id + `${index}`}
                product={record}
                initialCount={record.amount}
              />
            ))
          ) : (
            <p>Корзина пуста</p>
          )}
          {totalSum != undefined && totalSum > 0 && (
            <div className="flex flex-col gap-1">
              <Separator />
              <div className="flex w-full justify-between items-center">
                <p>Сумма:</p>
                <p className="text-xl text-secondary-foreground">
                  {totalSum} <span className="text-foreground">₸</span>
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </div>
    </Dialog>
  );
}
