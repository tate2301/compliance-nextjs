import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token');
    const userCookie = request.cookies.get('user');
    const host = request.headers.get('host') || '';
    const url = request.nextUrl;

    // Parse user data from cookie
    let userData = null;
    if (userCookie) {
        try {
            userData = JSON.parse(userCookie.value);
        } catch (error) {
            console.error('Failed to parse user data:', error);
        }
    }

    // Determine if route is protected
    const isProtectedRoute =
        url.pathname.startsWith('/dashboard') ||
        url.pathname.startsWith('/app');

    // Handle unauthenticated users
    if (isProtectedRoute && (!token || !userCookie || !userData)) {
        const protocol = request.headers.get('x-forwarded-proto') || 'http';
        const baseHost = host.replace(/^(app\.|admin\.)/, '');
        const baseUrl = new URL('/auth/signin', `${protocol}://${baseHost}`);
        const returnUrl = encodeURIComponent(`${protocol}://${host}`);
        return NextResponse.redirect(new URL(`${baseUrl.toString()}?return_url=${returnUrl}`));
    }

    // Handle API routes with headers
    if (url.pathname.startsWith('/api/')) {
        const requestHeaders = new Headers(request.headers);
        if (token) {
            requestHeaders.set('Authorization', `Bearer ${token.value}`);
        }
        if (userData) {
            requestHeaders.set('userId', userData.id);
        }

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/app/:path*',
        '/subdomains/:path*',
        '/api/:path*',
        '/'
    ],
};