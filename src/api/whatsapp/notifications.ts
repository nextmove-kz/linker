"use server";

import { BusinessRecord, OrderItemsRecord, OrdersRecord } from "../api_types";

const url = "https://whblinker.netlify.app/api/business-notification";

type NotificationData = {
  phone: string;
  id: string;
  orderItems: string;
  orderDetails: string;
  paymentMethod: string;
};

export const sendBusinessNotification = async (
  orderData: OrdersRecord,
  business: BusinessRecord,
  orderItems: OrderItemsRecord[]
) => {
  const bodyObject: NotificationData = {
    phone: "78" + business.phone_number.slice(2),
    id: orderData.id,
    orderItems: orderItems.map(productString).join("; \r"),
    orderDetails: orderData.details.replaceAll("\n", "; \r"),
    paymentMethod: orderData.payment,
  };

  console.log(bodyObject);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyObject),
  });
  console.log(res);
};

const productString = (product: OrderItemsRecord) => {
  const baseString = `${product.product_name} - ${product.amount}`;
  if (!product.selected_variants) {
    return `${product.product_name} - ${product.amount}`;
  }

  return `${baseString} (${product.selected_variants!})`;
};
