import { ExpandedOrderRecord } from "@/api/custom_types";
import Link from "next/link";
import { Button } from "../ui/button";
import { CircleX } from "lucide-react";

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
      case "pending":
        return 0;
      case "accepted":
        return 2;
      case "finished":
        return 4;
      default:
        return 0;
    }
  };

  const businessPhone = data.expand.business.phone_number;

  const text =
    "Здравствуйте! Я хотел бы получить больше информации по своему заказу.";

  const whatsappUrl = `https://wa.me/${businessPhone?.replace(
    /\D/g,
    ""
  )}?text=${encodeURIComponent(text)}`;

  return (
    <div className="rounded-lg bg-white p-2 py-10 shadow-md">
      <h2 className="mb-4 text-lg font-semibold">Заказ #{order}</h2>

      <div className="mb-6">
        {/* TODO: add later progress bar
       if status will become complex */}
      </div>

      <div className="mb-6 flex justify-between">
        {data.status !== "declined" ? (
          <div>
            {statusSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <step.icon
                  className={`h-10 w-10 ${
                    index <= currentStatusStep()
                      ? "text-primary"
                      : "text-gray-300"
                  }`}
                />
                <span className="mt-2 text-xs text-gray-500">{step.label}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center w-full">
            <CircleX className="text-red-500 w-14 h-14" />
            <span className="text-sm text-red-500">Заказ отклонен</span>
          </div>
        )}
      </div>
      <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <Button className="w-full">Связаться с бизнесом</Button>
      </Link>
    </div>
  );
};

export default ProgressBar;
