import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from './lib/verify-jwt-edge';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  /* return NextResponse.redirect(new URL('/home', request.url)) */
  const isLoginPage = request.nextUrl.pathname.startsWith('/admin/login');
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');
  const isGetRequest = request.method === 'GET';

  const shouldBeAuthenticated = isAdminPage && !isLoginPage;
  const shouldRedirect = shouldBeAuthenticated && isGetRequest;

  if (!shouldRedirect) {
    return NextResponse.next();
  }
  const jwtSession = request.cookies.get(
    process.env.LOGIN_COOKIE_NAME || 'loginSession',
  )?.value;

  /* console.log(jwtSession); */
  const isAuthenticated = await verifyJwt(jwtSession);
  /* console.log({ isAuthenticated }); */
  if (!isAuthenticated) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
