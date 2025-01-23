import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DEVICE_ID_COOKIE = "device_id";
const COOKIE_MAX_AGE = 315360000;

export async function handleDeviceId(
  request: NextRequest,
  response: NextResponse
) {
  const deviceId = request.cookies.get(DEVICE_ID_COOKIE);

  if (!deviceId) {
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
  }

  return response;
}
