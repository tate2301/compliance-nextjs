import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export const roleAccessMap = {
    owner:   ["/", "/settings", "/users", "/billing"],
    admin:   ["/", "/users"],
    member:  ["/"]
} as const;

export function doesRoleHaveAccess(role: string, path: string) {
    const allowed = roleAccessMap[role] ?? [];
    return allowed.some((pattern) => {
        // turn “/users/[id]” into regex
        const r = new RegExp(
            "^" + pattern.replace(/\[.*?\]/g, "[^/]+").replace(/\//g, "\\/") + "$"
        );
        return r.test(path);
    });
}

export async function requireSession(req: NextRequest) {
    const session = await getServerSession(authOptions); // <- reads the JWT cookie
    if (!session) {
        throw NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    return session;
}
