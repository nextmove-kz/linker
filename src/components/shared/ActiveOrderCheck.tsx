import { useActiveOrder } from "@/hooks/useActiveOrder";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const LoadingBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 overflow-hidden z-50">
      <div
        className="h-full bg-primary"
        style={{
          animation: "loading 1s infinite linear",
          width: "30%",
          position: "absolute",
          left: "-30%",
        }}
      />
      <style jsx>{`
        @keyframes loading {
          from {
            left: -30%;
          }
          to {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export function ActiveOrderCheck({ children }: Props) {
  const { data: activeOrder, isLoading } = useActiveOrder();
  const router = useRouter();
  const { id: businessId } = useParams<{ id: string }>();

  if (isLoading) {
    return (
      <>
        <LoadingBar />
        <div className="relative">
          {/* это заглушка чтобы страница загружалась сразу и не блочилась проверкой */}
          <div className="absolute inset-0 bg-background/50 z-40" />
          <div className="pointer-events-none">{children}</div>
        </div>
      </>
    );
  }

  if (activeOrder) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-4 h-dvh">
        <h2 className="text-xl font-semibold">
          У вас уже есть активный заказ в{" "}
          {activeOrder.expand.business.display_name}!
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
