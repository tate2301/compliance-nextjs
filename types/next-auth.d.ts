import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            tenantId: string;
            tenantSlug: string;
            role: import("@/lib/db/models/user").Role;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        tenantId: string;
        tenantSlug: string;
        role: import("@/lib/db/models/user").Role;
    }
}
