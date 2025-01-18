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

    try {
      const formDataObject = Object.fromEntries(formData.entries());
      const data = JSON.stringify(
        getPaymentData(selectedMethod || "", formDataObject)
      );

      const business = await fetchFirstItem(
        "business",
        `name = "${params.id}"`
      );
      const details = await fetchFirstItem(
        "details",
        `business = "${business.id}"`
      );
      const items = await fetchFirstItem(
        "shoppingBasket",
        `business = "${business.id}"`
      );

      if (!business || !details || !items) {
        console.error("Ошибка: не удалось загрузить необходимые данные.");
        return;
      }

      // console.log("CHECK: ", items.id, details.id, business.id, data);

      const result = await clientPocketBase.collection("orders").create({
        business: business.id,
        details: details.id,
        items: items.id,
        device_id: "1234123412341234123412341234",
        status: false,
        payment: data,
      });

      console.log(result);
      router.push(`/${params.id}/${result.id}/status`);
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  const fetchFirstItem = async (collection: string, filter: string) => {
    const response = await clientPocketBase
      .collection(collection)
      .getList(0, 1, { filter });
    return response.items[0] || null;
  };

  const getPaymentData = (method: string, formData: Record<string, any>) => {
    switch (method) {
      case "kaspi-pt":
        return { phoneNumber: formData["Ваш номер для платежа_phone"] || "" };
      case "cash":
        return { amount: formData["Сдача с какой суммы?"] || "" };
      case "kaspi-transfer":
        return { transfer: "kaspi-transfer" };
      default:
        return {};
    }
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
