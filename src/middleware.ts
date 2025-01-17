import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DEVICE_ID_COOKIE = "device_id";
// 10 лет в секундах
const COOKIE_MAX_AGE = 315360000;

export async function middleware(request: NextRequest) {
  const deviceId = request.cookies.get(DEVICE_ID_COOKIE);

  if (!deviceId) {
    const response = NextResponse.next();
    const newDeviceId = crypto.randomUUID();

    response.cookies.set({
      name: DEVICE_ID_COOKIE,
      value: newDeviceId,
      maxAge: COOKIE_MAX_AGE,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      httpOnly: false,
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
