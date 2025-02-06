"use server";

import { pocketbase } from "@/api/pocketbase";
import { redirect } from "next/navigation";

export async function signIn(formData: FormData) {
    const pb = await pocketbase();
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
        const authData = await pb
          .collection("business")
          .authWithPassword(data.email as string, data.password as string);
        console.log(authData);
        if (pb.authStore.isValid) {
          console.log("User authenticated successfully");
          console.log(pb.authStore.token);
          console.log(pb.authStore.record?.id);
            redirect("/asylfood/catalog");

        }
      } catch (error) {
        console.error("Error during authentication:", error);
        throw new Error("Authentication failed");
      }
}