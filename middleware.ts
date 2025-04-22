import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token');
    const user = request.cookies.get('user');
    const host = request.headers.get('host') || '';
    const url = request.nextUrl;

    // Check if request is from a subdomain
    const isAdminSubdomain = host.startsWith('admin.');
    const isAppSubdomain = host.startsWith('app.');

    // Block direct access to /subdomains/* routes
    if (url.pathname.startsWith('/subdomains/') && !isAdminSubdomain && !isAppSubdomain) {
        return new NextResponse(null, { status: 404 });
    }

    // Determine if route is protected
    const isProtectedRoute =
        url.pathname.startsWith('/dashboard') ||
        url.pathname.startsWith('/app') ||
        isAdminSubdomain ||
        isAppSubdomain;

    if (isProtectedRoute && (!token || !user)) {
        // Determine the base URL for the redirect
        const protocol = request.headers.get('x-forwarded-proto') || 'http';
        const baseHost = host.replace(/^(app\.|admin\.)/, ''); // Remove subdomain for auth
        const baseUrl = new URL('/auth/signin', `${protocol}://${baseHost}`);

        // Create the return URL that preserves the original request URL
        const returnUrl = encodeURIComponent(`${protocol}://${host}`);

        return NextResponse.redirect(new URL(`${baseUrl.toString()}?return_url=${returnUrl}`));
    }

    if (url.pathname.startsWith('/api/')) {
        const requestHeaders = new Headers(request.headers);
        if (token) {
            requestHeaders.set('Authorization', `Bearer ${token.value}`);
        }
        if (user) {
            try {
                const userData = JSON.parse(user.value);
                requestHeaders.set('userId', userData.id);
            } catch (error) {
                console.error('Failed to parse user data:', error);
            }
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