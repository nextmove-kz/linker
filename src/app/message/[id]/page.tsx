import { OrdersRecord } from "@/api/api_types";
import { getOrder } from "@/api/order";

// пУЬ К фАаЙЛу
const Message = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const order = await getOrder(id);
  const getKeysBeforeUnderscore = (obj: OrdersRecord) => {
    const keys = Object.keys(obj);
    return keys
      .filter((key) => key.includes("_"))
      .map((key) => key.split("_")[0]);
  };

  if ("error" in order) {
    return <div>Error: {order.error}</div>;
  }

  const postfix = getKeysBeforeUnderscore(order);
  const keys = Object.keys(order);
  return (
    <div className="flex flex-col items-center justify-center">
      <p>IAESFHOIEvfovojewvik</p>
      <p>
        {postfix.map((field: any, index: number) => (
          <p key={index}>{field === "Адрес" && order[keys[index]]}</p>
        ))}
      </p>
    </div>
  );
};

export default Message;
