"use server";

import { da } from "date-fns/locale";
import {
  BusinessRecord,
  LandingUsersRecord,
  OrderItemsRecord,
  OrdersRecord,
} from "../api_types";
import { log } from "console";

const url = "https://whblinker.netlify.app/api/";

type BusinessNotificationData = {
  phone: string;
  id: string;
  orderItems: string;
  orderDetails: string;
  paymentMethod: string;
};

type ClientAcceptNotificationData = {
  phone: string;
  business: string;
  id: string;
  orderItems: string;
  orderDetails: string;
  paymentMethod: string;
};

type ClientDeclineNotificationData = {
  phone: string;
  business: string;
  id: string;
  orderItems: string;
};

export const orderDeclineNotification = async (
  orderData: OrdersRecord,
  business: BusinessRecord,
  orderItems: OrderItemsRecord[]
) => {
  const bodyObject: ClientDeclineNotificationData = {
    phone: "78" + orderData.phone.slice(2),
    business: business.display_name || "",
    id: orderData.id,
    orderItems: orderItems.map(productString).join("; \r").replaceAll("\n", ""),
  };

  console.log(bodyObject);

  const clientNotificationResponse = await fetch(url + "client-decline", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyObject),
  });
  console.log("notification res: ", clientNotificationResponse);
};

export const orderAcceptNotification = async (
  orderData: OrdersRecord,
  business: BusinessRecord,
  orderItems: OrderItemsRecord[]
) => {
  const bodyObject: ClientAcceptNotificationData = {
    phone: "78" + orderData.phone.slice(2),
    business: business.display_name || "",
    id: orderData.id,
    orderItems: orderItems.map(productString).join("; \r").replaceAll("\n", ""),
    orderDetails: orderData.details.replaceAll("\n", "; \r"),
    paymentMethod: orderData.payment,
  };

  console.log(JSON.stringify(bodyObject));

  const clientNotificationResponse = await fetch(url + "client-success", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyObject),
  });
  console.log("notification res: ", clientNotificationResponse);
};

export const sendBusinessNotification = async (
  orderData: OrdersRecord,
  business: BusinessRecord,
  orderItems: OrderItemsRecord[]
) => {
  const bodyObject: BusinessNotificationData = {
    phone: "78" + business.phone_number?.slice(2),
    id: orderData.id,
    orderItems: orderItems.map(productString).join("; \r").replaceAll("\n", ""),
    orderDetails: orderData.details.replaceAll("\n", "; \r"),
    paymentMethod: orderData.payment,
  };

  console.log(bodyObject);

  const businessNotificationResponse = await fetch(
    url + "business-notification",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObject),
    }
  );
  console.log("notification res: ", businessNotificationResponse);
};

const productString = (product: OrderItemsRecord) => {
  const baseString = `${product.product_name} - ${product.amount}`;
  if (!product.selected_variants) {
    return `${product.product_name} - ${product.amount}`;
  }

  return `${baseString} (${product.selected_variants!})`;
};

export const notifyFounders = async (data: any) => {
  console.log(JSON.stringify(data));

  const notifyResponse = await fetch(url + "notify-founders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  ``;
  console.log("notification res: ", notifyResponse);
};
