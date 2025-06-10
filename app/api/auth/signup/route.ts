import { cookies }       from "next/headers";
import { SignJWT }       from "jose";
import Tenant            from "@/lib/db/models/tenant";
import User              from "@/lib/db/models/user";
import { hashPassword }  from "@/lib/auth/crypto";
import dbConnect from "@/lib/db/mongoose";
import {authOptions} from "@/app/app/api/auth/[...nextauth]/route";
import {z} from "zod";

const bodySchema = z.object({
    email:        z.string().email(),
    password:     z.string().min(6),
    confirmPassword: z.string(),
    firstName:    z.string().min(2),
    lastName:     z.string().min(2)
}).refine(d => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

export const POST = async (req: Request) => {
    const parse = bodySchema.safeParse(await req.json());
    if (!parse.success)
        return Response.json({ message: parse.error.issues[0].message }, { status: 400 });

    const { email, password, firstName, lastName } = parse.data;

    /* ── tenant from sub-domain ───────────────────────── */
    const host = req.headers.get("host")!.split(":")[0];
    const ROOT = process.env.ROOT_DOMAIN!;
    const slug = host.endsWith(`.${ROOT}`) ? host.replace(`.${ROOT}`, "") : null;
    if (!slug) return new Response("Bad tenant", { status: 400 });

    await dbConnect();
    const tenant = await Tenant.findOne({ slug });
    if (!tenant) return new Response("Tenant not found", { status: 404 });

    if (await User.exists({ email, tenant })) {
        return new Response("Email already in use", { status: 409 });
    }

    /* ── create user ──────────────────────────────────── */
    const user = await User.create({
        email,
        password,
        firstName,
        lastName,
        tenant,
        role: tenant.users.length === 0 ? "owner" : "member"
    });
    tenant.users.push(user._id);
    await tenant.save();


    return Response.json({ ok: true });
};