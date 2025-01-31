import { pocketbase } from "@/api/pocketbase";
import { notFound } from "next/navigation";
import { ExpandedOrderItems, ExpandedOrderRecord } from "@/api/custom_types";
import OrderDetails from "./OrderDetails";
import { BusinessRecord, OrdersStatusOptions } from "@/api/api_types";

type OrderInfoParams = {
  params: Promise<{ orderId: string }>;
};

export type OrderInfoData = {
  id: string;
  status: OrdersStatusOptions;
  payment: string;
  businessName: string;
  items: ExpandedOrderItems[];
  totalSum: number;
  details: string;
  order: ExpandedOrderRecord;
  business: BusinessRecord;
};

export default async function OrderInfoPage({ params }: OrderInfoParams) {
  const { orderId } = await params;

  const pb = await pocketbase();
  const order = await pb
    .collection<ExpandedOrderRecord>("orders")
    .getOne(orderId, {
      expand: "items,business",
    });

  if (!order) {
    notFound();
  }

  const totalSum =
    order.expand?.items?.reduce(
      (sum: number, item: any) => sum + item.amount * (item.price || 0),
      0
    ) || 0;

  const orderData: OrderInfoData = {
    id: order.id,
    status: order.status!,
    payment: order.payment,
    businessName: order.expand?.business?.display_name || "",
    items: order.expand?.items || [],
    details: order.details,
    totalSum,
    order,
    business: order.expand?.business,
  };

  return <OrderDetails order={orderData} />;
}
