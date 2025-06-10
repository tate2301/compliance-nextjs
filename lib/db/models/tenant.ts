import mongoose, {Schema, Document, model, Model,} from "mongoose";
import {IComplianceUser} from "@/lib/db/models/user";

export interface ITenant extends Document {
    name: string,
    createdAt: Date,
    users: Array<Schema.Types.ObjectId>,
    slug: string,
}

const TenantSchema: Schema<ITenant> = new Schema<ITenant>(
    {
        name: {
            type: String,
            required: true
        },
        users: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }],
        slug: { type: String, required: true, unique: true },


    },
    {
        timestamps: true,
    }
)

const ComplianceTenant: Model<ITenant> = (mongoose.models?.Tenant as Model<IComplianceUser>) ||  model("Tenant", TenantSchema);

export default ComplianceTenant;
