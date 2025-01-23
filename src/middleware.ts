import { NextRequest, NextResponse } from "next/server";
import { handleDeviceId } from "./middleare/deviceId";
import { handleBusinessRedirect } from "./middleare/businessRedirect";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next();

  response = await handleDeviceId(request, response);

  const redirectResponse = await handleBusinessRedirect(request);
  if (redirectResponse) return redirectResponse;

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
