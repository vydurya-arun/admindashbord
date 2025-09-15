import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  // ✅ If user already logged in, prevent them from visiting /login
  if (pathname.startsWith("/login") && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  // ✅ Protect private routes
  if (pathname.startsWith("/user") || pathname.startsWith("/blogs")) {
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user/:path*",
    "/blogs/:path*",
    "/login", // so we can redirect logged-in users away from login
  ],
};
