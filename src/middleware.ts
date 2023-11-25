import { NextResponse, NextRequest } from "next/server"

export default async function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies?.getAll()?.some(cookie => cookie.name === 'next-auth.session-token') ?? false;
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
  matcher: ['/admin/:path*',],
}

// import { NextResponse, NextRequest } from "next/server";

// export default async function middleware(req: NextRequest) {
//   const isLoggedIn = req.cookies?.getAll()?.some(cookie => cookie.name === 'next-auth.session-token') ?? false;
//   if (isLoggedIn) {
//     const adminRedirect = new URL('/admin/dashboard', req.nextUrl.origin);
//     return NextResponse.redirect(adminRedirect);
//   } else {
//     const redirectUrl = new URL('/auths/signin', req.nextUrl.origin);
//     redirectUrl.search = `redirect=${encodeURIComponent(req.nextUrl.pathname)}`;
//     return NextResponse.redirect(redirectUrl);
//   }
// }

// export const config = {
//   matcher: ['/admin/:path*'],
// };
