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
import { Checkbox } from "@/components/ui/checkbox";
import InputField from "@/components/formFields/FormInput";
import PhoneField from "@/components/formFields/phone/PhoneField";
import { ActiveOrderCheck } from "@/components/shared/ActiveOrderCheck";
import { createItemsFromCart } from "./utils";
import { ExpandedShoppingRecord } from "@/api/custom_types";
import {
  compileMessage,
  formatOrderList,
  formatPaymentMethod,
} from "@/lib/utils";
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
      amount: formData.get("Сдача с какой суммы?_text") || "",
    }),
  },
  {
    id: "kaspi-transfer" as const,
    name: "Каспи перевод",
    icon: ArrowLeftRight,
    getPaymentData: () => ({ transfer: "kaspi-transfer" }),
  },
];

function PaymentInputs({
  selectedMethod,
  paymentConfirmed,
  setPaymentConfirmed,
}: {
  selectedMethod: PaymentMethodId | null;
  paymentConfirmed: boolean;
  setPaymentConfirmed: (checked: boolean) => void;
}) {
  if (!selectedMethod) return null;

  switch (selectedMethod) {
    case "kaspi-pt":
      return <PhoneField name="Ваш номер для платежа" />;
    case "cash":
      return <InputField name="Сдача с какой суммы?" placeholder="100" />;
    case "kaspi-transfer":
      return (
        <div className="flex flex-col gap-4">
          <div className="text-md flex flex-col gap-2">
            <span className="text-gray-500">Каспи перевод</span>
            <span className="select-none">
              Номер для перевода:{" "}
              <span className="text-primary font-bold select-text">
                +7 (890) 123-45-67
              </span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="payment-confirmed"
              checked={paymentConfirmed}
              onCheckedChange={(checked) =>
                setPaymentConfirmed(checked as boolean)
              }
              required
            />
            <label
              htmlFor="payment-confirmed"
              className="text-sm font-medium leading-none select-none"
            >
              Я провел оплату
            </label>
          </div>
        </div>
      );
  }
}

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId | null>(
    null
  );
  // TODO: Получение номера бизнеса из базы данных
  // TODO: Формирование видов оплаты из базы данных
  // TODO: Получение суммы оплаты из базы данных
  // TODO: Проверка на подтверждение оплаты
  // TODO: Акцент на том что это финальный этап заказа
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
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
        status: "pending",
        payment: JSON.stringify(method.getPaymentData(formData)),
      });

      basket.forEach((item) =>
        clientPocketBase.collection("shopping_cart").delete(item.id)
      );
      const notificationResponse = await fetch(
        `${process.env.WHATSAPP_BOT}/api/business-notification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: order.phone,
            id: order.id,
            orderItems: formatOrderList(orderItems) as string,
            orderDetails: order.details,
            paymentMethod: formatPaymentMethod(
              order.payment as Record<string, string>
            ),
          }),
        }
      );
      // console.log(notificationResponse);
      router.push(`/${params.id}/${order.id}/status`);
    } catch (error) {
      router.push(`/${params.id}`);
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
        {selectedMethod && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <PaymentInputs
              selectedMethod={selectedMethod}
              paymentConfirmed={paymentConfirmed}
              setPaymentConfirmed={setPaymentConfirmed}
            />
            <Button
              type="submit"
              className="mt-2"
              disabled={
                selectedMethod === "kaspi-transfer" && !paymentConfirmed
              }
            >
              Завершить заказ
            </Button>
          </form>
        )}
      </div>
    </ActiveOrderCheck>
  );
}
