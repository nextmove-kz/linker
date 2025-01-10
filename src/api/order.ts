"use server";

import { pocketbase } from "./pocketbase";

export async function makeOrder(formData: FormData){
    try {
        const pb = await pocketbase();
        await pb.collection("orders").create({ orderData:formData, finished: false });
        return { success: true };
    } catch (error) {
      console.error("Order error:", error);
      return { error: "Failed to create order" };
    }
}

export async function getOrder(id: string) {
    try {
        const pb = await pocketbase();
        const order = await pb.collection("orders").getOne(id);
        return order;
    } catch (error) {
      console.error("Order error:", error);
      return { error: "Failed to get order" };
    }
}
