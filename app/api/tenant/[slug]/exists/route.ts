import ComplianceTenant from "@/lib/db/models/tenant";
import dbConnect from "@/lib/db/mongoose";

export async function HEAD(
    _req: Request,
    { params }: { params: { slug: string } }
) {
    await dbConnect();
    const ok = await ComplianceTenant.exists({ slug: params.slug });
    return new Response(null, { status: ok ? 200 : 404 });
}

/* Optional GET if you want JSON for dev testing */
export async function GET(
    _req: Request,
    ctx: { params: { slug: string } }
) {
    const { status } = await HEAD(_req, ctx);
    return new Response(JSON.stringify({ exists: status === 200 }), {
        status,
        headers: { "content-type": "application/json" }
    });
}