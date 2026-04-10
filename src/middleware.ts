import { NextResponse, NextRequest } from "next/server";

const getCookieBasedOnEnv = (req: NextRequest) => {
  const isProduction = process.env.NODE_ENV === "production";
  const cookie = isProduction
    ? req?.cookies
      ?.getAll()
      ?.find((cookie) => cookie.name === "__Secure-next-auth.session-token")
    : req?.cookies
      ?.getAll()
      ?.find((cookie) => cookie.name === "next-auth.session-token") ?? false;

  return cookie;
};

const protectedRoutes = ["/admin"];

export default async function middleware(req: NextRequest) {
  const isLoggedIn = getCookieBasedOnEnv(req);
  const { pathname } = req.nextUrl;
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/auths/signin", req?.nextUrl.origin);
    loginUrl.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
