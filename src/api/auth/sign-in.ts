"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PocketBase, { ClientResponseError } from "pocketbase";

export async function authenticateBusiness(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Server-side PocketBase instance
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

  try {
    const authData = await pb
      .collection("business")
      .authWithPassword(email, password);

    // Await the cookies() before using set
    const cookieStore = await cookies();
    cookieStore.set({
      name: "pocketbase_auth",
      value: authData.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return { success: true, error: null };
  } catch (error) {
    console.error("Error during authentication:", error);

    let message = "Произошла непредвиденная ошибка";
    if (error instanceof ClientResponseError) {
      switch (error.status) {
        case 400:
          message = "Неверный email или пароль";
          break;
        case 500:
          message = "Ошибка сервера. Попробуйте позже";
          break;
        default:
          message = "Ошибка аутентификации";
      }
    } else if (error instanceof Error) {
      message = "Ошибка сети. Проверьте подключение";
    }

    return { success: false, error: message };
  }
}
