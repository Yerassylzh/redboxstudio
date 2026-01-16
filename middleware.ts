import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

const handleI18n = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAdminRoute = path.startsWith('/admin');
  
  // 1. Handle I18n ONLY for non-admin routes
  let response = NextResponse.next();
  if (!isAdminRoute) {
    response = handleI18n(request);
  } else {
    // For admin routes, we need to manually pass the request headers/cookies if we manipulate them, 
    // but typically NextResponse.next() is fine.
    // However, we need to ensure localizations aren't enforced.
    response = NextResponse.next({
      request: {
        headers: request.headers,
      }
    });
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Refresh session if needed
  const { data: { user } } = await supabase.auth.getUser()

  const isLoginPage = path === '/admin/login';

  // 2. Protect Admin Routes
  if (isAdminRoute) {
    // If trying to access Admin pages (excluding login) and NOT logged in -> Redirect to Login
    if (!isLoginPage && !user) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // If trying to access Login page and ALREADY logged in -> Redirect to Dashboard
    if (isLoginPage && user) {
       const dashboardUrl = new URL('/admin', request.url);
       return NextResponse.redirect(dashboardUrl);
    }
  }

  return response
}
 
export const config = {
  // Match internationalized pathnames AND admin pathnames
  matcher: ['/', '/(ru|en)/:path*', '/admin/:path*']
};
