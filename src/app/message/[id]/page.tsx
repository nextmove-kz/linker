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

  // TODO: возможны доработки
  function createMessage(order: Object) {
    let message = "";
    const addressParts = [];

    for (const [key, value] of Object.entries(order)) {
      if (
        key.endsWith("_apartment") ||
        key.endsWith("_housenumber") ||
        key.endsWith("_street")
      ) {
        addressParts.push(value);
      } else if (key.endsWith("_select")) {
        message += `${key.split("_")[0]}: ${value}\n`;
      } else if (key.endsWith("_datetime")) {
        message += `${key.split("_")[0]}: ${value}\n`;
      } else if (key.endsWith("_group")) {
        message += `${key.split("_")[0]}: ${value}\n`;
      } else if (key.endsWith("_count")) {
        message += `${key.split("_")[0]}: ${value}\n`;
      } else if (key.endsWith("_multichoice")) {
        message += `${key.split("_")[0]}: ${value.join(", ")}\n`;
      } else if (key.endsWith("_text")) {
        message += `${key.split("_")[0]}: ${value}\n`;
      } else if (key.endsWith("_textarea")) {
        message += `${key.split("_")[0]}: ${value}\n`;
      } else if (key.endsWith("_phone")) {
        message += `${key.split("_")[0]}: ${value}\n`;
      }
    }

    if (addressParts.length > 0) {
      message += `Адрес: ${addressParts.join(", ")}\n`;
    }

    return message;
  }

  const message = createMessage(order.orderData);
  return (
    <div className="flex flex-col items-center justify-center">
      <p>IAESFHOIEvfovojewvik</p>
      <p>{message}</p>
    </div>
  );
};

export default Message;
