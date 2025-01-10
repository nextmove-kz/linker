"use server";

import { pocketbase } from "./pocketbase";

export async function goToPayment(formData: FormData) {
    try {
        const getKeysAfterUnderscore = (obj: any) => {
            const keys = Object.keys(obj);
            return keys
              .filter(key => key.includes("_"))
              .map(key => key.split("_")[1]);
          };
        const keys = getKeysAfterUnderscore(formData);
        console.log(keys);
        keys.push("product");

        function formatData(data: Record<string, any>, keys: string[]): Record<string, any> {
            const formattedData: Record<string, any> = {};

            keys.forEach((key, index) => {
              const dataKeys = Object.keys(data);
              if (index < dataKeys.length) {
                formattedData[key] = data[dataKeys[index]];
              }
            });

            return formattedData;
          }
          const data = formatData(formData, keys);

      const pb = await pocketbase();
      await pb.collection("shoppingBasket").create({ data });
      return { success: true };
    } catch (error) {
      console.error("Payment error:", error);
      return { error: "Failed to pay" };
    }
  }