"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDeviceId } from "@/hooks/useDeviceId";
import clientPocketBase from "@/api/client_pb";
import {
  CircleDollarSignIcon,
  ReceiptText,
  ArrowLeftRight,
  Check,
} from "lucide-react";
import Branding from "@/components/branding";
import PaymentCard from "@/components/payment/PaymentCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import InputField from "@/components/formFields/FormInput";
import PhoneField from "@/components/formFields/phone/PhoneField";
import { ActiveOrderCheck } from "@/components/shared/ActiveOrderCheck";
import { createItemsFromCart, usePaymentFormData } from "./utils";
import { ExpandedShoppingRecord } from "@/api/custom_types";
import { compileMessage } from "@/lib/utils";
import { OrdersRecord } from "@/api/api_types";
import CashInput from "@/components/payment/CashInput";
import { sendBusinessNotification } from "@/api/whatsapp/notifications";

type PaymentMethodId = "kaspi-pt" | "cash" | "kaspi-transfer";

const paymentMethods = [
  {
    id: "kaspi-pt" as const,
    name: "Каспи платеж",
    icon: ReceiptText,
    getPaymentData: (formData: FormData) =>
      `Каспи Платежом. На номер: ${
        formData.get("Ваш номер для платежа_phone") || ""
      }`,
  },
  {
    id: "cash" as const,
    name: "Наличные",
    icon: CircleDollarSignIcon,
    getPaymentData: (formData: FormData) =>
      `Наличными. Сдача с суммы: ${
        formData.get("Сдача с какой суммы?_text") || ""
      }`,
  },
  {
    id: "kaspi-transfer" as const,
    name: "Каспи перевод",
    icon: ArrowLeftRight,
    getPaymentData: () => "Оплачено переводом на каспи",
  },
];

function PaymentInputs({
  selectedMethod,
  paymentConfirmed,
  phoneNumber,
  setPaymentConfirmed,
  totalSum,
}: {
  selectedMethod: PaymentMethodId | null;
  paymentConfirmed: boolean;
  phoneNumber: string;
  setPaymentConfirmed: (checked: boolean) => void;
  totalSum: number;
}) {
  if (!selectedMethod) return null;

  switch (selectedMethod) {
    case "kaspi-pt":
      return <PhoneField name="Ваш номер для платежа" />;
    case "cash":
      return (
        <CashInput
          name="Сдача с какой суммы?"
          placeholder="10000"
          required
          totalSum={totalSum}
        />
      );
    case "kaspi-transfer":
      return (
        <div className="flex flex-col gap-4">
          <div className="text-md flex flex-col gap-2">
            <span className="text-gray-500">Каспи перевод</span>
            <span className="select-none">
              Номер для перевода:{" "}
              <span className="text-primary font-bold select-text">
                {phoneNumber}
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
  // TODO: Формирование видов оплаты из базы данных
  // TODO: Акцент на том что это финальный этап заказа
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const params = useParams<{ id: string }>();
  const { phoneNumber, totalSum, anyLoading } = usePaymentFormData(params.id);
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
      // Разберемся позже с unknown, нужно будет выделить phone
      // @ts-ignore
      const phone: string = details[0].orderData["Контактный номер_phone"];
      console.log(phone);
      const detailsMessage = compileMessage(
        details[0].orderData as OrdersRecord
      );

      const order = await clientPocketBase.collection("orders").create({
        business: business.id,
        details: detailsMessage,
        items: orderItems.map((item) => item.id),
        device_id: deviceId,
        status: "pending",
        payment: method.getPaymentData(formData),
        phone: phone
          .replaceAll(" ", "")
          .replaceAll("-", "")
          .replaceAll("(", "")
          .replaceAll(")", ""),
      });

      basket.forEach((item) =>
        clientPocketBase.collection("shopping_cart").delete(item.id)
      );

      await sendBusinessNotification(order, business, orderItems);

      router.push(`/${params.id}/${order.id}/status`);
    } catch (error) {
      router.push(`/${params.id}`);
    }
  };

  if (anyLoading) {
    return null;
  }

  return (
    <ActiveOrderCheck>
      <div className="flex flex-col gap-4 max-w-[400px] p-2 mx-auto">
        <Branding sectionId={2} />
        <div className="space-y-2">
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-500">Сумма к оплате</span>
            <span className="text-xl text-gray-900 font-bold">
              {totalSum!.toLocaleString()} ₸
            </span>
          </div>
        </div>
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
              phoneNumber={phoneNumber!}
              totalSum={totalSum!}
            />
            <Button
              type="submit"
              className="mt-2"
              disabled={
                selectedMethod === "kaspi-transfer" && !paymentConfirmed
              }
            >
              Завершить заказ <Check className="w-4 h-4" />
            </Button>
          </form>
        )}
      </div>
    </ActiveOrderCheck>
  );
}
