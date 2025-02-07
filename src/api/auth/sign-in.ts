"use server";

import { AuthSystemFields } from "../api_types";
import { pocketbase } from "../pocketbase";
import { cookies } from "next/headers";

export const isLoggedIn = async () => {
    const pb = await pocketbase();
    return pb.authStore.isValid as unknown as Promise<boolean>;
  };

export const getBusiness = async () => {
    const pb = await pocketbase();
    return pb.authStore.record;
};


// export const logOut = async () => {
//     const pb = await pocketbase();
//     pb.authStore.clear();
//     cookies().delete("pb_auth");
//   };

//   export const signIn = async (email: string, password: string) => {
//     try {
//       const pb = await pocketbase();
//       const authData = await pb
//         .collection("business")
//         .authWithPassword(email, password);

//       cookies().set("pb_auth", pb.authStore.exportToCookie());
//       return authData;
//     } catch (error) {
//       console.log("ошибка" + error);
//       return null;
//     }
//   };