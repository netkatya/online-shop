import { NextRequest, NextResponse } from 'next/server';
import { checkServerSession, setCookiesOnResponse } from './lib/api/serverApi';

// Використовуємо ваші нові маршрути
const publicRoutes = ["/sign-in", "/sign-up"];
const privateRoutes = ["/basket", "/profile"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const requestCookies = request.cookies;
  const accessToken = requestCookies.get('accessToken')?.value;
  const refreshToken = requestCookies.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  if (!accessToken) {
    if (refreshToken) {
      try {
        // --- ВИПРАВЛЕНО ---
        // Передаємо request.cookies (тип ReadonlyRequestCookies),
        // наша checkServerSession тепер це обробляє коректно.
        const data = await checkServerSession(requestCookies);
        const setCookie = data.headers['set-cookie'];

        if (setCookie) {
          // Сесія успішно оновлена
          if (isPublicRoute) {
            const response = NextResponse.redirect(new URL('/', request.url));
            return setCookiesOnResponse(response, setCookie);
          }
          if (isPrivateRoute) {
            const response = NextResponse.next();
            return setCookiesOnResponse(response, setCookie);
          }
        }
      } catch (error) {
        // Помилка оновлення сесії
        console.error("Помилка оновлення сесії в middleware:", error);
        // Продовжуємо, ніби refreshToken не було
      }
    }

    // Якщо refreshToken або сесії немає (або оновлення не вдалось):
    if (isPublicRoute) {
      return NextResponse.next();
    }
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  // Якщо accessToken існує:
  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (isPrivateRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  // Matcher також виглядає коректно
  matcher: ["/sign-in", "/sign-up", "/basket/:path*", "/profile/:path*"],
};