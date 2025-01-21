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
import { BusinessRecord } from "@/api/api_types";
import ShoppingCard from "./catalog/ShoppingCard";
import { notFound, useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useShoppingBasketQuery } from "@/hooks/useShoppingBasket";
import { Separator } from "./ui/separator";
import clientPocketBase from "@/api/client_pb";
import { useRouter } from "next/navigation";
import { sectionsHref } from "@/const/sections";
import { ScrollArea } from "./ui/scroll-area";

export default function Branding({ sectionId }: { sectionId: number }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useShoppingBasketQuery(id);

  const getData = async () => {
    if (!id) {
      notFound();
    }
    try {
      const businesses = await clientPocketBase
        .collection("business")
        .getList<BusinessRecord>(1, 1, {
          filter: `name="${id}"`,
        });

      if (businesses.items.length > 0) {
        const business = businesses.items[0];
        return business.displayName || "Без названия";
      } else {
        router.replace("/not-found");
      }
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
      throw error;
    }
  };

  const { data: title } = useQuery({
    queryKey: ["shoppingBasket", "business", id],
    queryFn: getData,
  });

  const totalItems =
    data?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;

  const totalSum =
    data?.reduce((total, item) => {
      const initial = (item.expand?.product?.price || 0) * (item.amount || 0);
      const variantsPrice =
        (item.expand?.selected_variants?.reduce(
          (sum, variant) => sum + (variant.price_change || 0),
          0
        ) || 0) * (item.amount || 0);

      return total + initial + variantsPrice;
    }, 0) || 0;

  return (
    <Dialog
      onOpenChange={async (open: boolean) => {
        await queryClient.invalidateQueries({ queryKey: ["shoppingBasket"] });
        router.refresh();
      }}
    >
      <div className="mx-2 flex items-center max-w-full justify-center gap-2 text-3xl font-semibold py-4">
        {sectionId !== 0 ? (
          <Link href={`/${id}${sectionsHref[sectionId - 1]}`} className="w-12">
            <ArrowLeft />
          </Link>
        ) : (
          <div className="w-12"></div>
        )}
        <span className="max-w-full text-center grow">{title}</span>
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
        <DialogContent className=" rounded-sm">
          <DialogHeader>
            <DialogTitle>Корзина</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="gap-4 flex flex-col">
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
            </div>
          </ScrollArea>
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
