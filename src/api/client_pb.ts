import PocketBase from "pocketbase";
import { TypedPocketBase } from "./api_types";

export const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL;

if (!POCKETBASE_URL) {
  throw new Error("PocketBase URL is not defined in environment variables");
}

const clientPocketBase = new PocketBase(POCKETBASE_URL) as TypedPocketBase;
clientPocketBase.autoCancellation(false);

export default clientPocketBase;
