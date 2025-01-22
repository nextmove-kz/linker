"use server";

import { pocketbase } from "./pocketbase";

export async function subscribeEmail(formData: FormData) {
  try {
    const email = formData.get("email")?.toString();
    if (!email) return { error: "Email is required" };

    const pb = await pocketbase();
    await pb.collection("subscribers").create({ email });
    return { success: true };
  } catch (error) {
    console.error("Subscription error:", error);
    return { error: "Failed to subscribe" };
  }
}
