import { NextRequest, NextResponse } from "next/server";
import { handleDeviceId } from "./middleware/deviceId";
import { isLoggedIn } from "./api/auth/sign-in";

export async function middleware(request: NextRequest) {
  const auth = await isLoggedIn();
  const path = request.nextUrl.pathname;

  let response = NextResponse.next();

  response = await handleDeviceId(request, response);

  if (request.nextUrl.pathname.startsWith('/order') && !auth) {
    return NextResponse.rewrite(new URL('/not-found', request.url))
  } else if ((!request.nextUrl.pathname.endsWith('/') && !request.nextUrl.pathname.endsWith('/[id]')) && !auth) {
    return NextResponse.redirect("/")
  }
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
};
