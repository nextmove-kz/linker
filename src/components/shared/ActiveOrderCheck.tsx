import { useActiveOrder } from "@/hooks/useActiveOrder";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export function ActiveOrderCheck({ children }: Props) {
  const { data: activeOrder, isLoading } = useActiveOrder();
  const router = useRouter();
  const { id: businessId } = useParams<{ id: string }>();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (activeOrder) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-4 h-dvh">
        <h2 className="text-xl font-semibold">
          У вас уже есть активный заказ в{" "}
          {activeOrder.expand.business.displayName}!
        </h2>
        <Button
          onClick={() => router.push(`/${businessId}/${activeOrder.id}/status`)}
        >
          Посмотреть статус заказа
        </Button>
      </div>
    );
  }

  return children;
}
