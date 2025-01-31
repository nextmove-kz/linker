"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import ProductList from "@/components/status/ProductList";
import { OrdersRecord, OrdersStatusOptions } from "@/api/api_types";
import { OrderInfoData } from "./page";
import { Separator } from "@/components/ui/separator";
import clientPocketBase from "@/api/client_pb";
import { useRouter } from "next/navigation";
import {
  orderAcceptNotification,
  orderDeclineNotification,
} from "@/api/whatsapp/notifications";

export default function OrderDetails({ order }: { order: OrderInfoData }) {
  const router = useRouter();

  const handleFinishOrder = async () => {
    await clientPocketBase.collection("orders").update(order.id, {
      status: "finished",
    });

    router.refresh();
  };

  const handleAcceptOrder = async () => {
    await clientPocketBase.collection("orders").update(order.id, {
      status: "accepted",
    });

    await orderAcceptNotification(order.order, order.business, order.items);

    router.refresh();
  };

  const handleDeclineOrder = async () => {
    await clientPocketBase.collection("orders").update(order.id, {
      status: "declined",
    });

    await orderDeclineNotification(order.order, order.business, order.items);

    router.refresh();
  };

  console.log(order);

  return (
    <div className="max-w-[400px] mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Заказ #{order.id}</h1>
        <div className="flex items-center gap-2">
          <span className="font-medium ">Статус:</span>
          <Badge
            variant={order.status === "pending" ? "destructive" : "secondary"}
          >
            {statusToString(order.status!)}
          </Badge>
        </div>
        <div>
          <span className="font-medium">Вид оплаты: </span>
          <br />
          <span>{order.payment}</span>
        </div>
      </div>

      <ProductList items={order.items} totalSum={order.totalSum} />
      <div className="rounded-lg p-6 shadow-md">
        <h2 className=" text-lg font-semibold">Детали заказа</h2>
        <Separator className="my-4" />
        <pre className="font-sans text-sm leading-loose">{order.details}</pre>
      </div>

      {order.status === "accepted" && (
        <Button onClick={handleFinishOrder} className="w-full">
          Завершить заказ
        </Button>
      )}

      {order.status === "pending" && (
        <div className="flex flex-col gap-4">
          <Button onClick={handleAcceptOrder} className="w-full">
            Принять заказ
          </Button>
          <Button
            onClick={handleDeclineOrder}
            className="w-full"
            variant={"secondary"}
          >
            Отклонить заказ
          </Button>
        </div>
      )}
    </div>
  );
}

function statusToString(status: OrdersStatusOptions) {
  switch (status) {
    case "pending":
      return "Ожидает ответа!";
    case "declined":
      return "Отклонен";
    case "accepted":
      return "Принят";
    case "finished":
      return "Завершен";
  }
}
