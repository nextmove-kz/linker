import { Truck, Package, CheckCircle, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const StatusPage = () => {
  const statusSteps = [
    { icon: Package, label: "Заказ принят" },
    { icon: MoveRight, label: "" },
    { icon: CheckCircle, label: "Заказ завершен" },
  ];

  return (
    <div className="flex flex-col gap-4 max-w-[400px] p-2 mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">Статус заказа</h1>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Order #ORD12345</h2>

        <div className="mb-6">
          {/* TODO: add later progress bar
           if status will become complex */}
        </div>

        <div className="mb-6 flex justify-between">
          {statusSteps.map((step, index) => (
            <div key={index} className="flex flex-col items-center mx-4">
              <step.icon className={`h-12 w-12 text-gray-300`} />
              <span className="mt-2 text-xs text-gray-500">{step.label}</span>
            </div>
          ))}
        </div>

        <p className="mb-4 text-sm text-gray-600">
          Ожидаемая дата получения заказа: 20 минут
        </p>

        <Button className="w-full">Связаться с поставщиком</Button>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Детали заказа</h2>

        <div className="mb-2 flex justify-between text-sm">
          <span>1x Тортик</span>
          <span>$60.00</span>
        </div>
        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between font-semibold">
            <span>Всего</span>
            <span>100.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
