import { OrderItemsRecord } from "@/api/api_types";
import { ExpandedOrderRecord } from "@/api/custom_types";
import { pocketbase } from "@/api/pocketbase";
import { History } from "lucide-react";
import Link from "next/link";

const OrderHistory = async ({ business }: { business: string }) => {
  const pb = await pocketbase();
  const orders = await pb
    .collection("orders")
    .getFullList<ExpandedOrderRecord>({
      filter: `business='${business}' && (status='finished' || status='declined')`,
      expand: "items",
    });
  const getSum = (items: OrderItemsRecord[]) => {
    const totalSum = items.reduce(
      (sum, item) => sum + item.amount * (item.price || 0),
      0
    );
    return totalSum;
  };
  return (
    <div className="p-6 border-none w-full rounded-lg bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <div className="w-full">
          <div className="flex justify-between mb-4 items-center">
            <h2 className="text-xl font-semibold ">История заказов</h2>
            <History />
          </div>
          <div className="flex flex-col gap-2">
            {orders.map((order) => (
              <Link href={`/order/info/${order.id}`} key={order.id}>
                <div className="cursor-pointer py-4 border hover:border-primary rounded-lg duration-200 p-4">
                  <div className="flex justify-between">
                    <p className="font-mono">{order.phone}</p>
                    <p className="font-mono">
                      {getSum(order.expand?.items || [])}₸
                    </p>
                  </div>
                  <p className="text-sm text-slate-500">
                    {order.created
                      ? new Date(order.created).toLocaleString("ru-RU", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "N/A"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderHistory;
