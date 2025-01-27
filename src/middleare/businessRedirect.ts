import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { pocketbase } from "@/api/pocketbase";

async function checkBusinessExists(businessName: string) {
  console.log("lakjsdkljKLJSAdlajsdljaklsdjlkasjkdl");
  try {
    const pb = await pocketbase();
    const records = await pb.collection("business").getList(1, 1, {
      filter: `name = "${businessName}"`,
    });
    return records.totalItems > 0;
  } catch {
    return false;
  }
}

export async function handleBusinessRedirect(request: NextRequest) {
  // const path = request.nextUrl.pathname.slice(1);

  // if (
  //   !path.includes("/") &&
  //   !path.startsWith("_next/") &&
  //   !path.startsWith("favicon.ico")
  // ) {
  //   const appPages = ["info", "about", "contact", ""];
  //   if (!appPages.includes(path)) {
  //     try {
  //       const businessExists = await checkBusinessExists(path);
  //       if (businessExists) {
  //         return NextResponse.redirect(
  //           new URL(`/${path}/catalog`, request.url)
  //         );
  //       }
  //       return NextResponse.rewrite(new URL("/404", request.url));
  //     } catch (error) {
  //       console.error("Business check error:", error);
  //     }
  //   }
  // }

  return null;
}
