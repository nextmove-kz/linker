"use client";

import Branding from "@/components/branding";
import { InputField } from "@/components/formFields/FormInput";
import PhoneField from "@/components/formFields/phone/PhoneField";
import PaymentCard from "@/components/payment/PaymentCard";
import { Button } from "@/components/ui/button";
import {
  CircleDollarSignIcon as Money,
  ReceiptText as Bill,
  ArrowLeftRight as Transfer,
} from "lucide-react";
import { useEffect, useState } from "react";
import { on } from "events";
import { useParams, useRouter } from "next/navigation";
import clientPocketBase from "@/api/client_pb";

const paymentMethods = [
  { id: "kaspi-pt", name: "Каспи платеж", icon: Bill },
  { id: "cash", name: "Наличные", icon: Money },
  { id: "kaspi-transfer", name: "Каспи перевод", icon: Transfer },
];

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    let data;
    if (selectedMethod === "kaspi-pt") {
      data = JSON.stringify({
        phoneNumber: formData.get("Ваш номер для платежа_phone") || "",
      });
    } else if (selectedMethod === "cash") {
      data = JSON.stringify({
        amount: formData.get("Сдача с какой суммы?") || "",
      });
    } else if (selectedMethod === "kaspi-transfer") {
      data = JSON.stringify({
        transfer: "kaspi-transfer",
      });
    }

    console.log(data);
    const businessResponse = await clientPocketBase
      .collection("business")
      .getList(0, 1, { filter: `name = "${params.id}"` });
    const business = businessResponse.items[0];
    const businessID = businessResponse.items[0].id;
    const detailsResponse = await clientPocketBase
      .collection("details")
      .getList(0, 1, { filter: `business = "${business.id}"` });
    const detailsID = detailsResponse.items[0].id;
    const itemsResponse = await clientPocketBase
      .collection("shoppingBasket")
      .getList(0, 1, { filter: `business = "${business.id}"` });
    const itemsID = itemsResponse.items[0].id;
    console.log("CHECK: ", itemsID, detailsID, business.id, data);
    const result = await clientPocketBase.collection("orders").create({
      business: businessID,
      details: detailsID,
      items: itemsID,
      device_id: "1234123412341234123412341234",
      status: false,
      payment: data,
    });

    console.log(result);
    router.push(`/${params.id}/${result.id}/status`);
  };

  return (
    <div className="flex flex-col gap-4 max-w-[400px] p-2 mx-auto">
      <Branding />
      <h1 className="text-2xl font-bold text-gray-900 truncate">
        Оплата заказа
      </h1>
      <div className="grid grid-cols-2 gap-2">
        {paymentMethods.map((method) => (
          <PaymentCard
            key={method.id}
            id={method.id}
            name={method.name}
            icon={method.icon}
            selected={selectedMethod === method.id}
            onSelect={() => setSelectedMethod(method.id)}
          />
        ))}
      </div>
      <div className="pt-2">
        {selectedMethod === "kaspi-pt" && (
          <form
            onSubmit={onSubmit}
            className="flex flex-col p-2 max-w-[400px] gap-4 mx-auto"
          >
            <PhoneField name="Ваш номер для платежа" />
            <Button type="submit" className="mt-2">
              Продолжить
            </Button>
          </form>
        )}
        {selectedMethod === "cash" && (
          <form
            onSubmit={onSubmit}
            className="flex flex-col p-2 max-w-[400px] gap-4 mx-auto"
          >
            <InputField name="Сдача с какой суммы?" placeholder="100" />
            <Button type="submit" className="mt-2">
              Продолжить
            </Button>
          </form>
        )}
        {selectedMethod === "kaspi-transfer" && (
          <div className="flex flex-col p-2 max-w-[400px] gap-4 mx-auto text-sm">
            <span>Каспи перевод</span>
            <span>Номер для перевода: +7 (890) 123-45-67</span>
            <Button className="mt-2">Продолжить</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
