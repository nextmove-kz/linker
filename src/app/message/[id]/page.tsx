import { OrdersRecord } from "@/api/api_types";
import { getOrder } from "@/api/order";

// пУЬ К фАаЙЛу
const Message = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const order = await getOrder(id);

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
        message += `Выбранный пункт меню: ${value}\n`;
      } else if (key.endsWith("_datetime")) {
        message += `Дата и время: ${value}\n`;
      } else if (key.endsWith("_group")) {
        message += `Единичный выбор: ${value}\n`;
      } else if (key.endsWith("_count")) {
        message += `Количество: ${value}\n`;
      } else if (key.endsWith("_multichoice")) {
        message += `Выбранные пункты: ${value.join(", ")}\n`;
      } else if (key.endsWith("_text")) {
        message += `Текст: ${value}\n`;
      } else if (key.endsWith("_textarea")) {
        message += `Длинный текст: ${value}\n`;
      } else if (key.endsWith("_phone")) {
        message += `Телефон: ${value}\n`;
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
