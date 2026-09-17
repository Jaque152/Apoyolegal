import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["es", "en"];
const defaultLocale = "es";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignoramos rutas estáticas, imágenes y la carpeta _next
  if (
    pathname.includes('.') || 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // Comprobamos si la URL ya tiene el idioma 
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();
  
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host");

  const protocol =
    request.headers.get("x-forwarded-proto") ||
    "https";

  const redirectUrl = new URL(
    `/${defaultLocale}${pathname}`,
    `${protocol}://${host}`
  );

  return NextResponse.redirect(redirectUrl);

}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
};

