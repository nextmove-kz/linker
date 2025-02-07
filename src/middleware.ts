import { NextRequest, NextResponse } from "next/server";
import { handleDeviceId } from "./middleware/deviceId";
import { getBusiness, isLoggedIn } from "./api/auth/sign-in";

export async function middleware(request: NextRequest) {
  const auth = await isLoggedIn();
  const path = request.nextUrl.pathname;

  let response = NextResponse.next();

  response = await handleDeviceId(request, response);

  if (request.nextUrl.pathname.startsWith('/order') && !auth) {
    return NextResponse.rewrite(new URL('/not-found', request.url))
  } else if ((!request.nextUrl.pathname.endsWith('/') && !request.nextUrl.pathname.endsWith('/[id]')) && !auth) {
    return NextResponse.redirect(new URL('/auth/sign-in')
  }
  return response
}

export const config = {
  matcher: ["/((?!api).)*", "/api", "/auth/sign-up/details/:businessId", "/order/(.*)"]
};
