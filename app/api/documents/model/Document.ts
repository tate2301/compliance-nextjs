import { model, models, Schema } from "mongoose";

const DocumentSchema = new Schema({

}, {
    timestamps: true
})

export const ComplianceDocument = models.ComplianceDocument || model("ComplianceDocument", DocumentSchema);