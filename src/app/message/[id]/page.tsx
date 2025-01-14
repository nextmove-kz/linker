import { OrdersRecord } from "@/api/api_types";
import { getOrder } from "@/api/order";
import { OrdersResponse } from "../../../api/api_types";

// пУЬ К фАаЙЛу
const Message = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const order = await getOrder(id);
  if (!order) return;

  const proceessAddress = (orderData: Object, keys: string[], name: string) => {
    const streetKey = `${name}_street`;
    const housenumberKey = `${name}_housenumber`;
    const apartmentKey = `${name}_apartment`;
    const streetValue = orderData[streetKey as keyof typeof orderData];
    const housenumberValue =
      orderData[housenumberKey as keyof typeof orderData];
    const apartmentValue = orderData[apartmentKey as keyof typeof orderData];

    const addressString = `${name}: ул. ${streetValue} дом ${housenumberValue} кв. ${apartmentValue}\n`;

    keys.splice(keys.indexOf(streetKey), 1);
    keys.splice(keys.indexOf(housenumberKey), 1);
    keys.splice(keys.indexOf(apartmentKey), 1);

    return addressString;
  };

  const compileMessage = (orderData: Object) => {
    const complexTypes = [
      "apartment",
      "housenumber",
      "street",
      "multichoice",
      "files",
    ];
    const keys = Object.keys(orderData);

    let resultString = "";

    for (const key of keys) {
      const name = key.split("_")[0];
      const type = key.split("_")[1];
      const value: any = orderData[key as keyof typeof orderData];

      // console.log("resultString", resultString);

      let dataString;
      console.log("type", type);
      if (complexTypes.includes(type)) {
        console.log("is_complex");
        if (
          type === "apartment" ||
          type === "housenumber" ||
          type === "street"
        ) {
          dataString = proceessAddress(orderData, keys, name);
        }
        if (type === "multichoice") {
          dataString = `${name}: ${value.join(", ")}\n`;
        }
        if (type === "files") {
          dataString = "";
        }
      } else {
        dataString = `${name}: ${value}\n`;
      }

      resultString += dataString;
    }
    return resultString;
  };

  const message = compileMessage(order.orderData as OrdersRecord);
  return (
    <div className="flex flex-col items-center justify-center">
      <p>IAESFHOIEvfovojewvik</p>
      <pre>{message}</pre>
    </div>
  );
};

export default Message;
