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

  function generateMessage(jsonObj: Object, prefix = "") {
    if (typeof jsonObj !== "object" || jsonObj === null) {
      throw new Error("Input must be a valid JSON object");
    }

    function parseObject(obj: Object) {
      let message = "";

      for (const [key, value] of Object.entries(obj)) {
        if (key.toLowerCase().includes("адрес")) {
          const addressPart = key.split("_")[1] || "часть адреса";
          message += `Адрес (${addressPart}): ${value}\n`;
        } else if (key.toLowerCase().includes("select")) {
          message += `Выбранный пункт меню: ${value}\n`;
        } else if (key.toLowerCase().includes("datetime")) {
          message += `Дата и время: ${value}\n`;
        } else if (key.toLowerCase().includes("group")) {
          message += `Единичный выбор: ${value}\n`;
        } else if (key.toLowerCase().includes("multichoice")) {
          message += `Множественный выбор: ${value.join(", ")}\n`;
        } else if (key.toLowerCase().includes("files")) {
          message += `Изображение: (нет данных)\n`;
        } else if (key.toLowerCase().includes("count")) {
          message += `Количество: ${value}\n`;
        } else if (key.toLowerCase().includes("phone")) {
          message += `Телефон: ${value}\n`;
        } else if (key.toLowerCase().includes("textarea")) {
          message += `Текст: ${value}\n`;
        } else if (key.toLowerCase().includes("text")) {
          message += `Проверка текста: ${value}\n`;
        } else {
          message += `${key}: ${value}\n`;
        }
      }

      return message;
    }

    const messageBody = parseObject(jsonObj);
    return prefix ? `${prefix}\n${messageBody}` : messageBody;
  }

  const message = generateMessage(order.orderData, "Информация о заказе: ");
  return (
    <div className="flex flex-col items-center justify-center">
      <p>IAESFHOIEvfovojewvik</p>
      <p>{message}</p>
      {/* <p>
        {postfix.map((field: any, index: number) => (
          <p key={index}>{field === "Адрес" && order[keys[index]]}</p>
        ))}
      </p> */}
    </div>
  );
};

export default Message;
