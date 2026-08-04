import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const authRoutes = ["/login", "/register"];

const public_routes = ["/", "/login", "/register"];

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let userRole = null;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPublic = public_routes.includes(pathname);

  const decoded = accessToken ? (jwt.decode(accessToken) as JwtPayload) : null;

  if (decoded) {
    userRole = decoded.role;
  }

  if (accessToken && authRoutes.includes(pathname)) {
    if (userRole === "Customer") {
      return NextResponse.redirect(new URL("/dashboard/customer", request.url));
    }
    if (userRole === "Provider") {
      return NextResponse.redirect(new URL("/dashboard/provider", request.url));
    }
    if (userRole === "Admin") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }
  }

  if (!accessToken && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/dashboard/admin") && userRole !== "Admin") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathname.startsWith("/dashboard/customer") &&
    userRole !== "Customer"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathname.startsWith("/dashboard/provider") &&
    userRole !== "Provider"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};
