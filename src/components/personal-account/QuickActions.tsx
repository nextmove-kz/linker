import { Button } from "@/components/ui/button";
import { CreditCard, HelpCircle, LogOut, Settings } from "lucide-react";

const actions = [
  { name: "Настройки", icon: Settings },
  { name: "Оплата", icon: CreditCard },
  { name: "Поддержка", icon: HelpCircle },
  { name: "Выйти", icon: LogOut },
];

export default function QuickActions() {
  return (
    <div className="p-6 border-none w-full rounded-lg bg-white shadow-md">
      <h3 className="text-lg font-semibold mb-4">Быстрые действия</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <Button
            key={action.name}
            variant="outline"
            className="h-20 flex flex-col items-center justify-center"
          >
            <action.icon className="h-6 w-6 mb-2" />
            {action.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
