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

export default async function middleware(req: NextRequest) {
  const isLoggedIn = getCookieBasedOnEnv(req);
  const isOnAdminPage = req.nextUrl?.pathname.startsWith("/admin");
  const isOnBlogWritePage = req.nextUrl?.pathname.startsWith("/blog/write");
  const isOnBlogEditPage = req.nextUrl?.pathname.startsWith("/blog/edit");

  if ((isOnAdminPage || isOnBlogWritePage || isOnBlogEditPage) && !isLoggedIn) {
    const loginUrl = new URL("/auths/signin", req?.nextUrl.origin);
    loginUrl.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/blog/write", "/blog/edit/:id(.*)"],
};
