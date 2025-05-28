import { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";

export enum FormResponseStatus {
    INCOMPLETE = "incomplete",
    REVIEWING = "reviewing", 
    REJECTED = "rejected",
    ARCHIVED = "archived",
    ACTIVE = "active"
}

export interface IFormResponse extends Document {
    _id: string;
    form: Types.ObjectId; // ObjectId reference to ComplianceForm
    user: Types.ObjectId; // ObjectId reference to ComplianceUser  
    formData: Record<string, any>; // The actual form submission data
    status: FormResponseStatus;
    submittedAt?: Date;
    reviewedAt?: Date;
    reviewedBy?: Types.ObjectId; // ObjectId reference to admin/reviewer
    expiryDate?: Date; // When this response expires
    rejectionReason?: string;
    notes?: string; // Admin notes
    version: number; // Form version when submitted
    createdAt: Date;
    updatedAt: Date;
}

const FormResponseSchema = new Schema<IFormResponse>({
    form: {
        type: Schema.Types.ObjectId,
        ref: "ComplianceForm",
        required: true,
        index: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "ComplianceUser", 
        required: true,
        index: true
    },
    formData: {
        type: Schema.Types.Mixed,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(FormResponseStatus),
        default: FormResponseStatus.INCOMPLETE,
        index: true
    },
    submittedAt: {
        type: Date
    },
    reviewedAt: {
        type: Date
    },
    reviewedBy: {
        type: Schema.Types.ObjectId,
        ref: "ComplianceUser"
    },
    expiryDate: {
        type: Date,
        index: true
    },
    rejectionReason: {
        type: String
    },
    notes: {
        type: String
    },
    version: {
        type: Number,
        required: true,
        default: 1
    }
}, {
    timestamps: true
});

// Compound indexes for better query performance
FormResponseSchema.index({ user: 1, form: 1 });
FormResponseSchema.index({ user: 1, status: 1 });
FormResponseSchema.index({ form: 1, status: 1 });
FormResponseSchema.index({ expiryDate: 1, status: 1 });

export const FormResponse = (mongoose.models?.FormResponse as Model<IFormResponse>) || mongoose.model<IFormResponse>("FormResponse", FormResponseSchema);