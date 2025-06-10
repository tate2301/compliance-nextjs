import { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";

export enum FormResponseStatus {
    INCOMPLETE = "incomplete",
    REVIEWING = "reviewing", 
    REJECTED = "rejected",
    ARCHIVED = "archived",
    ACTIVE = "active"
}

export enum DocumentSubmissionStatus {
    DRAFT = "draft",
    SUBMITTED = "submitted",
    PENDING_VERIFICATION = "pending_verification",
    VERIFIED = "verified",
    REJECTED = "rejected",
    EXPIRED = "expired"
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

export interface IDocumentSubmission extends Document {
    _id: string;
    documentReference: Types.ObjectId; // Reference to DocumentReference
    user: Types.ObjectId; // Reference to user
    submissionData?: Record<string, any>; // For form-type documents
    fileData?: {
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        url: string; // Storage URL
        uploadedAt: Date;
    }; // For file upload documents
    status: DocumentSubmissionStatus;
    submittedAt?: Date;
    verifiedAt?: Date;
    verifiedBy?: Types.ObjectId; // Admin who verified
    expiryDate?: Date; // When this submission expires
    rejectionReason?: string;
    verificationNotes?: string;
    version: number; // Document version when submitted
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

const DocumentSubmissionSchema = new Schema<IDocumentSubmission>({
    documentReference: {
        type: Schema.Types.ObjectId,
        ref: "DocumentReference",
        required: true,
        index: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "ComplianceUser",
        required: true,
        index: true
    },
    submissionData: {
        type: Schema.Types.Mixed
    },
    fileData: {
        filename: { type: String },
        originalName: { type: String },
        mimeType: { type: String },
        size: { type: Number },
        url: { type: String },
        uploadedAt: { type: Date }
    },
    status: {
        type: String,
        enum: Object.values(DocumentSubmissionStatus),
        default: DocumentSubmissionStatus.DRAFT,
        index: true
    },
    submittedAt: {
        type: Date
    },
    verifiedAt: {
        type: Date
    },
    verifiedBy: {
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
    verificationNotes: {
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

// Document submission indexes
DocumentSubmissionSchema.index({ user: 1, documentReference: 1 });
DocumentSubmissionSchema.index({ user: 1, status: 1 });
DocumentSubmissionSchema.index({ documentReference: 1, status: 1 });
DocumentSubmissionSchema.index({ expiryDate: 1, status: 1 });

export const FormResponse = (mongoose.models?.FormResponse as Model<IFormResponse>) || mongoose.model<IFormResponse>("FormResponse", FormResponseSchema);

export const DocumentSubmission = (mongoose.models?.DocumentSubmission as Model<IDocumentSubmission>) || mongoose.model<IDocumentSubmission>("DocumentSubmission", DocumentSubmissionSchema);