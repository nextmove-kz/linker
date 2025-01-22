import { type LucideIcon } from "lucide-react";

interface PaymentCardProps {
  id: string;
  name: string;
  icon: LucideIcon;
  selected: boolean;
  onSelect: () => void;
}

export default function PaymentCard({
  id,
  name,
  icon: Icon,
  selected,
  onSelect,
}: PaymentCardProps) {
  return (
    <div
      className={`p-6 rounded-lg shadow-md cursor-pointer transition-all duration-200 ${
        selected
          ? "bg-primary text-primary-foreground"
          : "bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
      onClick={onSelect}
    >
      <div className="flex flex-col items-center space-y-4">
        <Icon className="w-6 h-6" />
        <h2 className="text-md font-semibold">{name}</h2>
      </div>
    </div>
  );
}
