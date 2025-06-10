import Tenant from "@/lib/db/models/tenant";
import User   from "@/lib/db/models/user";
import { hashPassword } from "@/lib/auth/crypto";
import {ObjectId} from "mongoose";
import dbConnect from "@/lib/db/mongoose";


const main = async () => {
    await dbConnect();

    for (const slug of ["acme", "beta"]) {
        const tenant = await Tenant.create({ name: slug.toUpperCase(), slug });
        const user   = await User.create({
            email: `${slug}@example.com`,
            firstName: "John",
            lastName: "Doe",
            password: await hashPassword("pass1234"),
            tenant,
            role: "owner"
        });
        tenant.users.push(user._id as ObjectId);
        await tenant.save();
        console.log(`[✓] tenant ${slug} seeded`);
    }
}

main()

