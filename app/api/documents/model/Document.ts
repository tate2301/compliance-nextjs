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
    theme?: FormTheme;
  };
  validityPeriod?: number; // Days until form expires (optional)
  status: FormStatus;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

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

const FormThemeSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  colors: {
    primary: String,
    secondary: String,
    accent: String,
    background: String,
    surface: String,
    text: String
  },
  font: String
}, { _id: false });

const FormDefinitionSchema = new Schema({
  fields: [FormFieldSchema],
  theme: FormThemeSchema
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
    required: true
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

export const ComplianceForm = (mongoose.models?.ComplianceForm as Model<IComplianceForm>) || mongoose.model<IComplianceForm>("ComplianceForm", ComplianceFormSchema);
