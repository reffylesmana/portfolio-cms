import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "@/utils/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Izinkan halaman login
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    await jwtUtils.verify(token);

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};