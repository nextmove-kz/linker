"use client";

import Branding from "@/components/branding";
import FormField from "@/components/formFields/FormField";
import { InputField } from "@/components/formFields/FormInput";
import PhoneField from "@/components/formFields/phone/PhoneField";
import PaymentCard from "@/components/payment/PaymentCard";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Gift,
  BanknoteIcon as Bank,
  CircleDollarSignIcon as Money,
  ReceiptText as Bill,
  ArrowLeftRight as Transfer,
} from "lucide-react";
import { useState } from "react";

const paymentMethods = [
  { id: "kaspi-pt", name: "Каспи платеж", icon: Bill },
  { id: "cash", name: "Наличные", icon: Money },
  { id: "kaspi-transfer", name: "Каспи перевод", icon: Transfer },
];

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-4 max-w-[400px] p-2 mx-auto">
      <Branding />
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
            action=""
            className="flex flex-col p-2 w-max-[400px] gap-4 mx-auto"
          >
            <PhoneField name="Ваш номер для платежа" />
          </form>
        )}
        {selectedMethod === "cash" && (
          <form
            action=""
            className="flex flex-col p-2 w-max-[400px] gap-4 mx-auto"
          >
            <InputField name="Сдача с какой суммы?" placeholder="100" />
          </form>
        )}
        {selectedMethod === "kaspi-transfer" && (
          <div className="flex flex-col p-2 w-max-[400px] gap-4 mx-auto text-sm">
            <span>Каспи перевод</span>
            <span>Номер для перевода: +7 (890) 123-45-67</span>
            <Button />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
