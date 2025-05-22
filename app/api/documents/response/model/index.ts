import { model, models, Schema } from "mongoose";

export enum ComplianceDocumentStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    EXPIRED = "expired"
}

const DocumentResponse = new Schema({
    document: {
        type: Schema.Types.ObjectId,
        ref: "ComplianceDocument"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "ComplianceUser"
    },
    status: {
        type: String,
        enum: ComplianceDocumentStatus,
        default: "pending"
    },
}, {
    timestamps: true    
})

export const ComplianceDocumentResponse = models.ComplianceDocumentResponse || model("ComplianceDocumentResponse", DocumentResponse);