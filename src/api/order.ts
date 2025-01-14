"use server";

import { pocketbase } from "./pocketbase";
import { OrdersRecord } from './api_types';


export async function getOrder(id: string) {
    try {
        const pb = await pocketbase();
        const order = await pb.collection("orders").getOne(id);
        return order as OrdersRecord;
    } catch (error) {
      console.error("Order error:", error);
      return null;
    }
}

