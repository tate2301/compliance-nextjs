import { NextResponse } from "next/server";
import { withAuth }     from "next-auth/middleware";

const ROOT          = process.env.ROOT_DOMAIN!;
const CACHE_SECONDS = 60;                                 // tenant cache TTL

export default withAuth(
    async function middleware(req) {
        const url   = req.nextUrl;
        const host  = (req.headers.get("host") ?? "").split(":")[0]; // drop :3000
        const token = req.nextauth.token;

        console.log(req.nextauth)

        const sub = host.endsWith(`.${ROOT}`) ? host.replace(`.${ROOT}`, "") : "";

        /* 1️⃣  404 if tenant slug is unknown ----------------------------------- */
        const reserved = ["", "www", "app", "admin"];

        console.log("Middleware subdomain:", sub, "token:", token, "host:", host);
        if (!reserved.includes(sub)) {
            const exists = await fetch(
                `${process.env.NEXT_PUBLIC_SITE_URL}/api/tenant/${sub}/exists`,
                { method: "GET", next: { revalidate: CACHE_SECONDS } }
            );

            if (exists.status === 404) {
                const url = req.nextUrl.clone()
                url.pathname = '/404'
                return NextResponse.rewrite(url);
            }
        }

        /* 2️⃣  Protected routes → login if no token ---------------------------- */
        const protectedPath =
            url.pathname.startsWith("/dashboard") ||
            url.pathname.startsWith("/app");

        if (protectedPath && !token) {
            const signIn = new URL("/auth/signin", process.env.NEXTAUTH_URL);
            signIn.searchParams.set("callbackUrl", encodeURIComponent(url.href));
            return NextResponse.redirect(signIn);
        }

        /* 3️⃣  Tenant mismatch (user logged in under a different slug) --------- */
        if (token && token.tenantSlug !== sub) {
            return NextResponse.rewrite(new URL("/403", req.url));
        }

        /* 4️⃣  Forward JWT to internal API ------------------------------------- */
        if (url.pathname.startsWith("/api/") && token) {
            const headers = new Headers(req.headers);
            headers.set(
                "Authorization",
                `Bearer ${req.cookies.get("next-auth.session-token")?.value ?? ""}`
            );
            headers.set("x-user-id", token.sub!);
            return NextResponse.next({ request: { headers } });
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: () => true        // 👆 keep this
        },
        secret: process.env.NEXTAUTH_SECRET,
        pages: { signIn: "/auth/signin" }
    }
);

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/app/:path*",
        "/subdomains/:path*",
        "/api/:path*",
        "/",
        '/((?!api/tenant/[^/]+/exists).*)'

    ]
};
