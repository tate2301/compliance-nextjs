import { FormField } from "@/forms_builder/types";

export interface User {
  created_at?: string;
  date_of_birth: string;
  email: string;
  email_verified_at?: string;
  first_name: string;
  id?: number;
  last_name: string;
  middle_names?: string;
  ni_number: string;
  occupation?: number;
  organisation_id?: number;
  phone: string;
  profile_image: string;
  isCompliant?: IsCompliant;
  role?: number;
  sex?: string;
  myScore?: number;
  maxScore?: number;
  occupation_type: {
    name: string;
  };
  occupation_name?: string;
}

export interface Admin {
  id: number;
  first_name: string;
  middle_names?: string | null;
  last_name: string;
  ni_number?: string | null;
  email: string;
  phone: string;
  profile_image?: string | null;
  date_of_birth?: string | null;
  sex?: string | null;
  role: number;
  occupation: number;
  email_verified_at?: string | null;
  token?: string | null;
  created_at: string; // ISO 8601 formatted datetime
  updated_at: string; // ISO 8601 formatted datetime
}

export interface IsCompliant {
  isCompliant: boolean;
  missing: string[];
  percentage: number;
}

export interface RegisterUser {
  date_of_birth: string;
  email: string;
  first_name: string;
  last_name: string;
  middle_names?: string;
  ni_number: string;
  occupation?: number;
  phone: string;
  profile_image: string;
  role?: number;
  sex?: string;
}

export interface Address {
  id?: number;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  county: string;
  postcode: string;
  country: string;
}

export interface DBS {
  id?: number;
  dbs_number: string;
  date_issued: string;
  date_expiring: string;
  dbs_type: number;
  user_id?: number;
  type?: {
    name: string;
  };
}
export interface DBSReference {
  id: number;
  name: string;
  reference: string;
}

export interface ProfRegReference {
  id: number;
  name: string;
  reference: string;
}

export interface ProffessionalRegistration {
  id?: number;
  prof_regi_id: number;
  registration_number: string;
  date_issued: string;
  date_expiring: string;
  certificate?: string;
  user_id?: number;
  type?: {
    name: string;
  };
}

export interface IDReference {
  id: number;
  name: string;
  reference: string;
}

export interface ID {
  id?: number;
  number: string;
  user_id?: number;
  issued_at: string;
  issue_date: string;
  expiry_date?: string;
  type_id: number;
  type?: {
    name: string;
  };
}

export interface RightToWork {
  id?: number;
  number?: string;
  user_id?: number;
  immigration_type: number;
  date_issued?: string;
  date_expiring?: string;
  type?: {
    name: string;
  };
}

export interface RightToWorkReference {
  id: number;
  name: string;
  reference: string;
}

export interface OccupationReference {
  id: number;
  name: string;
  reference: string;
}

export interface StaffDocument {
  createdAt: number;
  description: string;
  expiry_date: number;
  form_id: string;
  _id: string;
  status: {
    id: number;
    name: "PENDING" | "ACTIVE" | "ARCHIVED";
    created_at: number;
    updated_at: number;
  };
  status_id: number;
  theme: string;
  title: string;
  updatedAt: number;
  fields: FormField[];
}

export interface BasicRequirements {
  visa: boolean
  address: boolean
  dbs: boolean
  identification: boolean
  references: number
}

export interface UpdatePayload {
  [key:string]: any
}

export interface Reference {
  id?: number;
  user_id?: number;
  signature?: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  title?: string;
  company?: string;
  capacity_known?: string;
  date_known_from?: string;
  date_known_to?: string;
  reason_for_leaving?: string;
  careplans_score?: number;
  reliability_score?: number;
  character_score?: number;
  attitude_score?: number;
  relationships_with_others_score?: number;
  own_initiative_score?: number;
  discipline?: boolean;
  discipline_details?: string;
  safeguard?: boolean;
  safeguard_details?: string;
  employed?: boolean;
  employed_details?: string;
  crime?: boolean;
  crime_details?: string;
  extra_comments?: string;
  terms_accepted?: boolean;
  created_at?: string;
  updated_at?: string;
  token?: string;
}



export interface Training {
  id?: number;
  verified_by?: number;
  date_trained: string;
  date_expiring: string;
  certificate?: string;
  user_id: number;
  training_id: number;
  is_expired?: boolean;
  name?: string;
}

export interface TrainingReference {
  id: number;
  name: string;
  reference: string;
  selected?: boolean;
  is_required?: boolean;
}

export interface TrainingPayload {
  date_trained: string;
  date_expiring: string;
  training_id: Array<number>;
  user_id: number;
  certificate: any;
}

export interface Document {
  id?: number;
  uploaded_at?: string;
  verified_by?: number;
  certificate?: string;
  user_id?: number;
  name?: string;
}

export interface DocumentReference {
  id: number;
  name: string;
  reference: string;
  is_required?: boolean;
}

export interface DocumentPayload {
  Document_id: number;
  user_id: number;
  certificate: any;
}

// New enhanced document types
export enum DocumentType {
  FORM = "form",
  FILE_UPLOAD = "file_upload",
  TRAINING_CERTIFICATE = "training_certificate",
  IDENTITY_DOCUMENT = "identity_document",
  COMPLIANCE_DOCUMENT = "compliance_document"
}

export enum FormCategory {
  ONBOARDING = "onboarding",
  LEGAL = "legal",
  HEALTH = "health",
  EMPLOYMENT = "employment",
  ASSESSMENT = "assessment",
  COMPLIANCE = "compliance"
}

export enum DocumentSubmissionStatus {
  DRAFT = "draft",
  SUBMITTED = "submitted",
  PENDING_VERIFICATION = "pending_verification",
  VERIFIED = "verified",
  REJECTED = "rejected",
  EXPIRED = "expired"
}

export interface EnhancedDocumentReference {
  _id?: string;
  referenceId: string;
  name: string;
  description?: string;
  category: FormCategory;
  documentType: DocumentType;
  isRequired: boolean;
  isMandatoryForOnboarding: boolean;
  validityPeriod?: number;
  allowedFileTypes?: string[];
  maxFileSize?: number;
  formDefinition?: {
    fields: FormField[];
    theme?: any;
  };
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DocumentSubmission {
  _id?: string;
  documentReference: string | EnhancedDocumentReference;
  user: string;
  submissionData?: Record<string, any>;
  fileData?: {
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    url: string;
    uploadedAt: Date;
  };
  status: DocumentSubmissionStatus;
  submittedAt?: Date;
  verifiedAt?: Date;
  verifiedBy?: string;
  expiryDate?: Date;
  rejectionReason?: string;
  verificationNotes?: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DocumentSubmissionPayload {
  userId: string;
  documentReferenceId: string;
  submissionData?: Record<string, any>;
  fileData?: {
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    url: string;
    uploadedAt: Date;
  };
  status?: DocumentSubmissionStatus;
}
