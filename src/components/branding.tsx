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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Branding({ title }: { title: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["shoppingBasket"],
    queryFn: async () => {
      const result = await clientPocketBase
        .collection("shoppingBasket")
        .getFullList<ShoppingBasketRecord>({ expand: "product" });
      return result;
    },
  });

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      await clientPocketBase.collection("shoppingBasket").delete(id);
    },
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: ["shoppingBasket"] });

      const previousItems = queryClient.getQueryData<ShoppingBasketRecord[]>([
        "shoppingBasket",
      ]);

      queryClient.setQueryData<ShoppingBasketRecord[]>(
        ["shoppingBasket"],
        (old) => (old ? old.filter((item) => item.id !== deletedId) : [])
      );

      return { previousItems };
    },
    onError: (err, variables, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(["shoppingBasket"], context.previousItems);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppingBasket"] });
    },
  });

  function Delete(id: string) {
    mutation.mutate(id);
  }

  return (
    <Dialog
      onOpenChange={async (open: boolean) => {
        await queryClient.invalidateQueries({ queryKey: ["shoppingBasket"] });
        await queryClient.refetchQueries({ queryKey: ["shoppingBasket"] });
        router.refresh();
      }}
    >
      <div className="flex mx-auto items-center justify-center gap-2 text-3xl font-semibold p-4">
        <Link href="/">
          <ArrowLeft />
        </Link>
        <span className="max-w-full text-center flex-1">{title}</span>

        <DialogTrigger>
          <ShoppingCart className="w-12" />
        </DialogTrigger>
        <DialogContent className="w-[400px]">
          <DialogHeader>
            <DialogTitle>Корзина</DialogTitle>
          </DialogHeader>
          {data && data.length > 0 ? (
            data.map((record) => {
              return (
                <ShoppingCard
                  key={record.id}
                  product={record}
                  initialCount={record.amount}
                  Delete={Delete}
                />
              );
            })
          ) : (
            <>
              <p>Нет данных</p>
            </>
          )}
        </DialogContent>
      </div>
    </Dialog>
  );
}
