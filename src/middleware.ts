import { NextRequest, NextResponse } from "next/server";
import { handleDeviceId } from "./middleware/deviceId";
import { isLoggedIn } from "./api/auth/sign-in";

export async function middleware(request: NextRequest) {
  const auth = await isLoggedIn();
  const path = request.nextUrl.pathname;

  let response = NextResponse.next();

  response = await handleDeviceId(request, response);

  if (path !== "/" && !(path.includes("/auth"))) {
    if (!auth) {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
};
