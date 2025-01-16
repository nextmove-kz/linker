import { Package, CheckCircle, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pocketbase } from "@/api/pocketbase";
import { OrdersRecord, ShoppingBasketRecord } from "@/api/api_types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ExpandedOrderRecord,
  ExpandedShoppingRecord,
} from "@/api/custom_types";

const StatusPage = async ({
  params,
}: {
  params: Promise<{ id: string; order: string }>;
}) => {
  const { id, order } = await params;

  const pb = await pocketbase();
  const data = await pb
    .collection("orders")
    .getOne<ExpandedOrderRecord>(order, {
      expand: "items.product,details,business",
    });

  console.log(data);

  const statusSteps = [
    { icon: Package, label: "Заказ принят" },
    { icon: MoveRight, label: "" },
    { icon: CheckCircle, label: "Заказ завершен" },
  ];
  if (!Array.isArray(data.items)) {
    throw new Error("data.items is not an array");
  }
  const proceessAddress = (orderData: Object, keys: string[], name: string) => {
    const streetKey = `${name}_street`;
    const housenumberKey = `${name}_housenumber`;
    const apartmentKey = `${name}_apartment`;
    const streetValue = orderData[streetKey as keyof typeof orderData];
    const housenumberValue =
      orderData[housenumberKey as keyof typeof orderData];
    const apartmentValue = orderData[apartmentKey as keyof typeof orderData];

    const addressString = `${name}: ул. ${streetValue} дом ${housenumberValue} кв. ${apartmentValue}\n`;

    keys.splice(keys.indexOf(streetKey), 1);
    keys.splice(keys.indexOf(housenumberKey), 1);
    keys.splice(keys.indexOf(apartmentKey), 1);

    return addressString;
  };

  const compileMessage = (orderData: Object) => {
    const complexTypes = [
      "apartment",
      "housenumber",
      "street",
      "multichoice",
      "files",
    ];
    const keys = Object.keys(orderData);

    let resultString = "";

    for (const key of keys) {
      const name = key.split("_")[0];
      const type = key.split("_")[1];
      const value: any = orderData[key as keyof typeof orderData];

      // console.log("resultString", resultString);

      let dataString;
      console.log("type", type);
      if (complexTypes.includes(type)) {
        console.log("is_complex");
        if (
          type === "apartment" ||
          type === "housenumber" ||
          type === "street"
        ) {
          dataString = proceessAddress(orderData, keys, name);
        }
        if (type === "multichoice") {
          dataString = `${name}: ${value.join(", ")}\n`;
        }
        if (type === "files") {
          dataString = "";
        }
      } else {
        dataString = `${name}: ${value}\n`;
      }

      resultString += dataString;
    }
    return resultString;
  };

  const message = compileMessage(data.expand.details.orderData as OrdersRecord);
  return (
    <div className="flex flex-col gap-4 max-w-[400px] p-2 mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">
        Статус заказа ({data.expand.business?.name})
      </h1>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Order #{order}</h2>

        <div className="mb-6">
          {/* TODO: add later progress bar
           if status will become complex */}
        </div>

        <div className="mb-6 flex justify-between">
          <div className="flex flex-col items-center mx-4">
            <Package
              className={`h-12 w-12 ${
                data.status ? "text-gray-300" : "text-blue-500"
              }`}
            />
            <span className="mt-2 text-xs text-gray-500">Заказ принят</span>
          </div>
          <div className="flex flex-col items-center mx-4">
            <MoveRight className={`h-12 w-12 text-gray-300`} />
            <span className="mt-2 text-xs text-gray-500"></span>
          </div>
          <div className="flex flex-col items-center mx-4">
            <CheckCircle
              className={`h-12 w-12 text-gray-300 ${
                data.status ? "text-blue-500" : "text-gray-300"
              }`}
            />
            <span className="mt-2 text-xs text-gray-500">Заказ завершен</span>
          </div>
        </div>
        <Button className="w-full">Связаться с бизнесом</Button>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Заказ</h2>

        <div className="mb-2 flex justify-between text-sm">
          {data.expand.items.map((item: ExpandedShoppingRecord) => {
            const product = item.expand.product;

            return (
              <div key={item.id} className="flex justify-between w-full">
                <span>
                  {item.amount}x {product.title}
                </span>
                <span>{product.price}₸</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between font-semibold">
            <span>Всего</span>
            <span>$100.00</span>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="mb-4 text-lg font-semibold">
              Детали заказа
            </AccordionTrigger>
            <AccordionContent>
              <pre>{message}</pre>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default StatusPage;
