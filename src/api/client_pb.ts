import PocketBase from "pocketbase";
import { TypedPocketBase } from "./api_types";

const clientPocketBase = new PocketBase(
  process.env.PB_TYPEGEN_URL
) as TypedPocketBase;

clientPocketBase.autoCancellation(false);
export default clientPocketBase;
