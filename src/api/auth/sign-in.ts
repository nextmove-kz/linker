"use server";

import { pocketbase } from "@/api/pocketbase";
import { redirect } from "next/navigation";

export async function signIn(formData: FormData) {
  const pb = await pocketbase();
  const data = Object.fromEntries(formData);

  try {
    const authData = await pb
      .collection("business")
      .authWithPassword(data.email as string, data.password as string);

    if (!pb.authStore.isValid) {
      throw new Error("Authentication failed");
    }

    return { success: true };
  } catch (error) {
    console.error("Authentication error:", error);
    throw new Error(
      error.response?.message ||
      "Неверный email или пароль. Проверьте введённые данные."
    );
  }
}