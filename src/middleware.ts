import { NextResponse, NextRequest } from "next/server"

const getCookieBasedOnEnv = (req: NextRequest) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const cookie = isProduction ? req?.cookies?.getAll()?.find(cookie => cookie.name === '__Secure-next-auth.session-token') : req?.cookies?.getAll()?.find(cookie => cookie.name === 'next-auth.session-token') ?? false;

  return cookie;
}

export default function middleware(req: NextRequest) {
  const isLoggedIn = getCookieBasedOnEnv(req);
  const isOnAdminPage = req.nextUrl?.pathname.startsWith('/admin');
  if (isOnAdminPage) {
    if (isLoggedIn) return NextResponse.next()
    return NextResponse.redirect(new URL('/auths/signin', req?.nextUrl.origin))
  } else if (isLoggedIn) {
    console.log('redirect to admin')
    return NextResponse.redirect(new URL('/admin/dashboard', req.nextUrl.origin))
  }
  return NextResponse.next()
}


export const config = {
  matcher: ['/admin/:path*',]
}

// req.cookies?.getAll()?.some(cookie => cookie.name === 'next-auth.session-token') ?? false;