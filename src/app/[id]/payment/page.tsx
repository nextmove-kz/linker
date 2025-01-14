"use client";

import Branding from "@/components/branding";
import FormField from "@/components/formFields/FormField";
import { InputField } from "@/components/formFields/FormInput";
import PaymentCard from "@/components/payment/PaymentCard";
import {
  CreditCard,
  Gift,
  BanknoteIcon as Bank,
  CircleDollarSignIcon as money,
} from "lucide-react";
import { useState } from "react";

const paymentMethods = [
  { id: "credit-card", name: "Credit Card", icon: CreditCard },
  { id: "cash", name: "Cash", icon: money },
  { id: "gift-card", name: "Gift Card", icon: Gift },
  { id: "bank-transfer", name: "Bank Transfer", icon: Bank },
];

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-4 w-[400px] p-2 mx-auto">
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
      <div>
        {selectedMethod === "credit-card" && (
          <form action="">
            <FormField name="Кредитная карточка">
              <InputField name="номер карточки" placeholder="номер карточки" />
            </FormField>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
