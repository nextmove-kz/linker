import { Package, CheckCircle, MoveRight } from "lucide-react";
import { pocketbase } from "@/api/pocketbase";
import { OrdersRecord } from "@/api/api_types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExpandedOrderRecord } from "@/api/custom_types";
import { notFound } from "next/navigation";
import ImageDialog from "@/components/payment/ImageDialog";
import { handleRequest } from "./utils";
import { compileMessage } from "@/lib/utils";
import ProductList from "@/components/status/ProductList";
import ProgressBar from "@/components/status/ProgressBar";

const StatusPage = async ({
  params,
}: {
  params: Promise<{ id: string; order: string }>;
}) => {
  const { id, order } = await params;

  const pb = await pocketbase();
  const data = await handleRequest(() =>
    pb.collection("orders").getOne<ExpandedOrderRecord>(order, {
      expand: "items,business",
    })
  );

  if (!data) {
    notFound();
  }

  if (!Array.isArray(data.items)) {
    throw new Error("data.items is not an array");
  }

  const totalSum = data?.expand.items.reduce(
    (sum, item) => sum + item.amount * (item.price || 0),
    0
  );

  const message = data.details;

  const statusSteps = [
    { icon: Package, label: "Заказ принят" },
    { icon: MoveRight, label: "" },
    { icon: CheckCircle, label: "Заказ завершен" },
  ];
  return (
    <div className="flex flex-col gap-4 max-w-[400px] p-2 py-8 mx-auto">
      {/* TITLE BLOCK*/}
      <h1 className="text-2xl font-bold text-gray-900 truncate">
        Статус заказа ({data.expand.business?.displayName})
      </h1>

      {/* ORDER STATUS BLOCK*/}
      <ProgressBar order={order} statusSteps={statusSteps} data={data} />

      {/* LIST OF PRODUCTS BLOCK*/}
      <ProductList items={data.expand.items} totalSum={totalSum} />

      {/* ORDER DEATAILS BLOCK*/}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="mb-4 text-lg font-semibold">
              Детали заказа
            </AccordionTrigger>
            <AccordionContent>
              <pre>{message}</pre>
              {/* {(data.expand.details?.attachments?.length || 0) > 0 && (
                <ImageDialog
                  name="Открыть изображения"
                  title="Изображение"
                  img={data.expand.details?.attachments || []}
                  id={data.expand.details.id}
                />
              )} */}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default StatusPage;
