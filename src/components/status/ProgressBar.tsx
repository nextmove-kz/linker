import { ExpandedOrderRecord } from "@/api/custom_types";
import Link from "next/link";
import { Button } from "../ui/button";

const ProgressBar = ({
  order,
  statusSteps,
  data,
}: {
  order: string;
  statusSteps: any[];
  data: ExpandedOrderRecord;
}) => {
  const currentStatusStep = () => {
    switch (data.status) {
      case false:
        return 0;
      case true:
        return 2;
      default:
        return 0;
    }
  };

  const businessPhone = data.expand.business.phone_number;

  const text =
    "Здравствуйте! Я хотел бы получить больше информации по своему заказу.";

  const whatsappUrl = `https://wa.me/${businessPhone.replace(
    /\D/g,
    ""
  )}?text=${encodeURIComponent(text)}`;

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold">Заказ #{order}</h2>

      <div className="mb-6">
        {/* TODO: add later progress bar
       if status will become complex */}
      </div>

      <div className="mb-6 flex justify-between">
        {statusSteps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <step.icon
              className={`h-12 w-12 ${
                index <= currentStatusStep() ? "text-primary" : "text-gray-300"
              }`}
            />
            <span className="mt-2 text-xs text-gray-500">{step.label}</span>
          </div>
        ))}
      </div>
      <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <Button className="w-full">Связаться с бизнесом</Button>
      </Link>
    </div>
  );
};

export default ProgressBar;
