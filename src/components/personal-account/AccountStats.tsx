import { Card, CardContent } from "@/components/ui/card";
import { Users, DollarSign, ShoppingCart } from "lucide-react";

const stats = [
  { name: "Total Customers", value: "1,234", icon: Users },
  { name: "Revenue", value: "$12,345", icon: DollarSign },
  { name: "Orders", value: "56", icon: ShoppingCart },
];

export default function AccountStats() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.name}>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <stat.icon className="h-8 w-8 mb-2 text-primary" />
            <p className="text-sm font-medium text-gray-500">{stat.name}</p>
            <p className="text-xl font-semibold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
