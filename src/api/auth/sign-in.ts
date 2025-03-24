"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PocketBase, { ClientResponseError } from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

export const isLoggedIn = async () => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("pocketbase_auth")?.value;

  if (!authToken) {
    return false;
  }

  try {
    pb.authStore.save(authToken, null);

    await pb.collection("business").authRefresh();
    return true;
  } catch {
    return false;
  }
};

export const getBusiness = async () => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("pocketbase_auth")?.value;

  if (!authToken) {
    return null;
  }

  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

  try {
    pb.authStore.save(authToken, null);
    await pb.collection("business").authRefresh();

    return pb.authStore.model;
  } catch {
    return null;
  }
};

export const logout = async () => {
  const cookieStore = await cookies();

  try {
    cookieStore.delete("pocketbase_auth");

    cookieStore.delete("business_id");

    redirect("/auth/sign-in");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export async function authenticateBusiness(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const authData = await pb
      .collection("business")
      .authWithPassword(email, password);

    const cookieStore = await cookies();
    cookieStore.set({
      name: "pocketbase_auth",
      value: authData.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
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
