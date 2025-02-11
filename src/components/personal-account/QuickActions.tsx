import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, CreditCard, HelpCircle, LogOut } from "lucide-react";

const actions = [
  { name: "Settings", icon: Settings },
  { name: "Billing", icon: CreditCard },
  { name: "Support", icon: HelpCircle },
  { name: "Log Out", icon: LogOut },
];

export default function QuickActions() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
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
      </CardContent>
    </Card>
  );
}
