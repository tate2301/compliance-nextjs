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
  created_at: number;
  description: string;
  expiry_date: number;
  form_id: string;
  id: number;
  status: {
    id: number;
    name: "PENDING" | "ACTIVE" | "ARCHIVED";
    created_at: number;
    updated_at: number;
  };
  status_id: number;
  theme: string;
  title: string;
  updated_at: number;
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
