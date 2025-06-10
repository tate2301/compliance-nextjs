import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/app/app/api/auth/[...nextauth]/route";
import {Role} from "@/lib/db/models/user";

export function withRole(roles: (Role)[], handler) {
    return async (req: Request, ...rest: any[]) => {
        // @ts-ignore
        const session = await getServerSession(authOptions, req, rest[0]);
        if (!session || !roles.includes((session as Session).user.role))
            return new Response("Forbidden", { status: 403 });
        return handler(req, ...rest, session);
    };
}