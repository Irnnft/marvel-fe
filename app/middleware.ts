import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Daftar protected routes
    const protectedRoutes = ['/dashboard', '/peminjaman'];
    const adminRoutes = ['/admin'];
    const authRoutes = ['/login', '/register'];

    const { pathname } = request.nextUrl;

    // Check if route is protected
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

    // Untuk production, cek token dari cookies
    // Untuk development, bisa skip atau implement sesuai kebutuhan
    
    // Note: Karena kita pakai Sanctum dengan session/cookies,
    // pengecekan auth lebih baik dilakukan di client-side (useAuth)
    // Middleware ini lebih untuk redirect logic

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
