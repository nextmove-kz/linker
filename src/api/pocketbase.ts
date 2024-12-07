import PocketBase from "pocketbase";
import { TypedPocketBase } from "./api_types";
import { cookies } from "next/headers";

export async function pocketbase() {
  const pb = new PocketBase(process.env.PB_TYPEGEN_URL) as TypedPocketBase;
  pb.autoCancellation(false);

  const cookie = await cookies();
  const pb_auth = cookie.get("pb_auth");
  if (pb_auth) {
    pb.authStore.loadFromCookie(`${pb_auth.value}`);
  }

  return pb;
}
