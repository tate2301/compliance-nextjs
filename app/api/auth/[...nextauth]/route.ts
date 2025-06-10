import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider     from "next-auth/providers/credentials";
import { MongooseAdapter }      from "@brendon1555/authjs-mongoose-adapter";
import User                     from "@/lib/db/models/user";
import dbConnect from "@/lib/db/mongoose";
import { verifyHash }           from "@/lib/auth/crypto";
import {ITenant} from "@/lib/db/models/tenant";

export const authOptions: AuthOptions = {
    session: { strategy: "jwt" },
    adapter :  MongooseAdapter(process.env.MONGODB_URI!),

    providers: [
        CredentialsProvider({
            name: "Email & Password",
            credentials: {
                email:    { label: "Email",    type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize({ email, password }) {
                await dbConnect();
                const user = await User.findOne({ email }).select("+password").populate("tenant");
                console.log(user)
                if (!user || !(await verifyHash(password, user.password))) return null;

                return {
                    id:          user.id,
                    tenantId:    (user.tenant as ITenant).id,
                    tenantSlug:  (user.tenant as ITenant).slug,
                    role:        user.role,
                    email:       user.email
                };
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.tenantId   = (user as any).tenantId;
                token.tenantSlug = (user as any).tenantSlug;
                token.role       = (user as any).role;
            }
            return token;
        },
        // expose claims to the client
        async session({ session, token }) {
            if (session.user) {
                session.user.id         = token.sub!;
                session.user.tenantId   = token.tenantId;
                session.user.tenantSlug = token.tenantSlug;
                session.user.role       = token.role;
            }
            return session;
        },

    },

    secret: process.env.NEXTAUTH_SECRET,

};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };