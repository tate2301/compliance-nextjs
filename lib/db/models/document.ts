import { FormField, FormTheme } from "@/forms_builder/types";
import mongoose, { Model, Schema } from "mongoose";

export enum FormCategory {
  ONBOARDING = "onboarding",
  LEGAL = "legal", 
  HEALTH = "health",
  EMPLOYMENT = "employment",
  ASSESSMENT = "assessment",
  COMPLIANCE = "compliance"
}

export enum FormStatus {
  DRAFT = "draft",
  ACTIVE = "active",
  ARCHIVED = "archived"
}

export enum DocumentType {
  FORM = "form", // Form with fields that can be filled out
  FILE_UPLOAD = "file_upload", // Requires file upload (PDF, DOCX, etc.)
  TRAINING_CERTIFICATE = "training_certificate",
  IDENTITY_DOCUMENT = "identity_document", 
  COMPLIANCE_DOCUMENT = "compliance_document"
}

export interface IDocumentReference {
  _id?: string;
  referenceId: string; // External reference ID (from third-party service)
  name: string;
  description?: string;
  category: FormCategory;
  documentType: DocumentType;
  isRequired: boolean;
  isMandatoryForOnboarding: boolean;
  validityPeriod?: number; // Days until document expires
  allowedFileTypes?: string[]; // For file uploads: ['pdf', 'docx', 'jpg', etc.]
  maxFileSize?: number; // In bytes
  formDefinition?: {
    fields: FormField[];
  }; // Only for FORM type documents
  status: FormStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IComplianceForm {
  _id?: string;
  formId: string; // Unique identifier for the form
  title: string;
  description: string;
  category: FormCategory;
  isRequired: boolean;
  isMandatoryForOnboarding: boolean;
  jotFormId?: string; // Original JotForm ID for reference
  jotFormUrl?: string; // Original JotForm URL
  formDefinition: {
    fields: FormField[];
  };
  validityPeriod?: number; // Days until form expires (optional)
  status: FormStatus;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

// Document Reference Schema
const DocumentReferenceSchema = new Schema<IDocumentReference>({
  referenceId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String,
    enum: Object.values(FormCategory),
    required: true,
    index: true
  },
  documentType: {
    type: String,
    enum: Object.values(DocumentType),
    required: true,
    index: true
  },
  isRequired: {
    type: Boolean,
    default: false,
    index: true
  },
  isMandatoryForOnboarding: {
    type: Boolean,
    default: false,
    index: true
  },
  validityPeriod: {
    type: Number // Days
  },
  allowedFileTypes: [{
    type: String
  }],
  maxFileSize: {
    type: Number // Bytes
  },
  formDefinition: {
    fields: [{
      id: { type: String, required: true },
      type: { type: String, required: true },
      label: { type: String, required: true },
      required: { type: Boolean, default: false },
      properties: {
        placeholder: String,
        minLength: Number,
        maxLength: Number,
        choices: [String],
        npsMaxRating: Number,
        allowedFileTypes: [String],
        maxFileSize: Number,
        scalePoints: Number,
        width: Number,
        height: Number,
        text: String,
        fontSize: Number,
        fontWeight: String,
        textAlign: String,
        textColor: String
      }
    }],
   
  },
  status: {
    type: String,
    enum: Object.values(FormStatus),
    default: FormStatus.ACTIVE
  }
}, {
  timestamps: true
});

// Original ComplianceForm Schema (keeping for backward compatibility)
const FormFieldSchema = new Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  label: { type: String, required: true },
  required: { type: Boolean, default: false },
  properties: {
    placeholder: String,
    minLength: Number,
    maxLength: Number,
    choices: [String],
    npsMaxRating: Number,
    allowedFileTypes: [String],
    maxFileSize: Number,
    scalePoints: Number,
    width: Number,
    height: Number,
    text: String,
    fontSize: Number,
    fontWeight: String,
    textAlign: String,
    textColor: String
  }
}, { _id: false });


const FormDefinitionSchema = new Schema({
  fields: [FormFieldSchema],
}, { _id: false });

const ComplianceFormSchema = new Schema<IComplianceForm>({
  formId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: Object.values(FormCategory),
    required: true,
    index: true
  },
  isRequired: {
    type: Boolean,
    default: false
  },
  isMandatoryForOnboarding: {
    type: Boolean,
    default: false,
    index: true
  },
  jotFormId: {
    type: String
  },
  jotFormUrl: {
    type: String
  },
  formDefinition: {
    type: FormDefinitionSchema,
    required: false
  },
  validityPeriod: {
    type: Number // Days
  },
  status: {
    type: String,
    enum: Object.values(FormStatus),
    default: FormStatus.ACTIVE
  },
  version: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

export const DocumentReference = (mongoose.models?.DocumentReference as Model<IDocumentReference>) || mongoose.model<IDocumentReference>("DocumentReference", DocumentReferenceSchema);

export const ComplianceForm = (mongoose.models?.ComplianceForm as Model<IComplianceForm>) || mongoose.model<IComplianceForm>("ComplianceForm", ComplianceFormSchema);
