"use server";

import { ClientResponseError } from "pocketbase";
import { pocketbase } from "../pocketbase";

export const isLoggedIn = async () => {
  const pb = await pocketbase();
  return pb.authStore.isValid as unknown as Promise<boolean>;
};

export const getBusiness = async () => {
  const pb = await pocketbase();
  return pb.authStore.record;
};

export const logout = async () => {
  const pb = await pocketbase();
  pb.authStore.clear();
};

// ХЗ
export const signIn = async (email: string, password: string) => {
  try {
    const pb = await pocketbase();
    const authData = await pb
      .collection("business")
      .authWithPassword(email, password);

    console.log(authData);
    return authData;
  } catch (error) {
    if (error instanceof ClientResponseError) {
      console.error(`Authentication failed: ${error.message}`);
    } else {
      console.error("An unexpected error occurred during authentication.");
    }
  }
};
