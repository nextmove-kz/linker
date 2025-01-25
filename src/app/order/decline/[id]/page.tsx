import { pocketbase } from "@/api/pocketbase";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, CircleX } from "lucide-react";
import Link from "next/link";

const OrderDecline = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  try {
    const pb = await pocketbase();
    await pb.collection("orders").update(id, { status: "declined" });
  } catch (error) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center gap-4 max-w-[400px] p-2 mx-auto">
        <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg rounded-lg text-center">
          <div className="animate-bounce mb-6">
            <CheckCircle className="mx-auto h-16 w-16 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Ошибка при отклонении заказа
          </h1>
          <p className="text-gray-600 mb-6">
            При отклонении заказа произошла ошибка. Попробуйте позже.
          </p>
          <div className="mb-6">
            <p className="text-sm text-gray-500">Order id: #{id}</p>
          </div>
          <Link href="/" passHref>
            <Button className="w-full">
              Вернуться на главную
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-4 max-w-[400px] p-2 mx-auto">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg rounded-lg text-center">
        <div className="mb-6">
          <CircleX className="mx-auto h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Заказ отклонен
        </h1>
        <p className="text-gray-600 mb-6">
          Заказ был отклонен и обработан в системе. Вы можете продолжить
        </p>
        <div className="mb-6">
          <p className="text-sm text-gray-500">Order id: #{id}</p>
        </div>
        <Link href="/" passHref>
          <Button className="w-full">
            Вернуться на главную
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderDecline;
