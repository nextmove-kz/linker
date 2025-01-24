"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDeviceId } from "@/hooks/useDeviceId";
import clientPocketBase from "@/api/client_pb";
import {
  CircleDollarSignIcon,
  ReceiptText,
  ArrowLeftRight,
} from "lucide-react";
import Branding from "@/components/branding";
import PaymentCard from "@/components/payment/PaymentCard";
import { Button } from "@/components/ui/button";
import InputField from "@/components/formFields/FormInput";
import PhoneField from "@/components/formFields/phone/PhoneField";
import { ActiveOrderCheck } from "@/components/shared/ActiveOrderCheck";
import { createItemsFromCart } from "./utils";
import { ExpandedShoppingRecord } from "@/api/custom_types";
import { compileMessage } from "@/lib/utils";
import { OrdersRecord } from "@/api/api_types";

type PaymentMethodId = "kaspi-pt" | "cash" | "kaspi-transfer";

const paymentMethods = [
  {
    id: "kaspi-pt" as const,
    name: "Каспи платеж",
    icon: ReceiptText,
    getPaymentData: (formData: FormData) => ({
      phoneNumber: formData.get("Ваш номер для платежа_phone") || "",
    }),
  },
  {
    id: "cash" as const,
    name: "Наличные",
    icon: CircleDollarSignIcon,
    getPaymentData: (formData: FormData) => ({
      amount: formData.get("Сдача с какой суммы?") || "",
    }),
  },
  {
    id: "kaspi-transfer" as const,
    name: "Каспи перевод",
    icon: ArrowLeftRight,
    getPaymentData: () => ({ transfer: "kaspi-transfer" }),
  },
];

function PaymentForms({
  selectedMethod,
  onSubmit,
}: {
  selectedMethod: PaymentMethodId | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  if (!selectedMethod) return null;

  switch (selectedMethod) {
    case "kaspi-pt":
      return (
        <form
          onSubmit={onSubmit}
          className="flex flex-col p-2 max-w-[400px] gap-4 mx-auto"
        >
          <PhoneField name="Ваш номер для платежа" />
          <Button type="submit" className="mt-2">
            Продолжить
          </Button>
        </form>
      );
    case "cash":
      return (
        <form
          onSubmit={onSubmit}
          className="flex flex-col p-2 max-w-[400px] gap-4 mx-auto"
        >
          <InputField name="Сдача с какой суммы?" placeholder="100" />
          <Button type="submit" className="mt-2">
            Продолжить
          </Button>
        </form>
      );
    case "kaspi-transfer":
      return (
        <form
          onSubmit={onSubmit}
          className="flex flex-col p-2 max-w-[400px] gap-4 mx-auto text-sm"
        >
          <span>Каспи перевод</span>
          <span>Номер для перевода: +7 (890) 123-45-67</span>
          <Button type="submit" className="mt-2">
            Продолжить
          </Button>
        </form>
      );
  }
}

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId | null>(
    null
  );
  const params = useParams();
  const router = useRouter();
  const deviceId = useDeviceId();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const business = await clientPocketBase
        .collection("business")
        .getFirstListItem(`name = "${params.id}"`);

      const { items: details } = await clientPocketBase
        .collection("details")
        .getList(0, 1, {
          filter: `business = "${business.id}" && device_id = "${deviceId}"`,
        });

      const { items: basket, totalItems } = await clientPocketBase
        .collection("shopping_cart")
        .getList<ExpandedShoppingRecord>(0, 100, {
          filter: `product.business = "${business.id}" && device_id = "${deviceId}"`,
          expand: "product,selected_variants",
        });

      if (!business || !details || totalItems === 0) {
        router.push(`/${params.id}`);
      }

      const method = paymentMethods.find((m) => m.id === selectedMethod);
      if (!method) return;

      const orderItems = await createItemsFromCart(basket);
      const detailsMessage = compileMessage(
        details[0].orderData as OrdersRecord
      );

      const order = await clientPocketBase.collection("orders").create({
        business: business.id,
        details: detailsMessage,
        items: orderItems.map((item) => item.id),
        device_id: deviceId,
        status: false,
        payment: JSON.stringify(method.getPaymentData(formData)),
      });

      basket.forEach((item) =>
        clientPocketBase.collection("shopping_cart").delete(item.id)
      );

      router.push(`/${params.id}/${order.id}/status`);
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  return (
    <ActiveOrderCheck>
      <div className="flex flex-col gap-4 max-w-[400px] p-2 mx-auto">
        <Branding sectionId={2} />
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
          <PaymentForms
            selectedMethod={selectedMethod}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </ActiveOrderCheck>
  );
}
