import { NextRequest, NextResponse } from "next/server";
import { handleDeviceId } from "./middleware/deviceId";
import { isLoggedIn } from "./api/auth/sign-in";

const PROTECTED_ROUTES = ["/auth/sign-up/details/", "/order/"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  let response = NextResponse.next();

  response = await handleDeviceId(request, response);

  // Если хоть один путь начинается с защищенного префикса, то надо проверить авторизацию
  const requiresAuth = PROTECTED_ROUTES.some((route) => path.startsWith(route));

  if (requiresAuth) {
    const isAuthenticated = await isLoggedIn();

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
