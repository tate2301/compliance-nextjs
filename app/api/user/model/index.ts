import mongoose, { Model, Schema } from "mongoose";

export interface IOnboardingStatus {
  isCompleted: boolean;
  completedSteps: string[];
  totalSteps: number;
  currentStep?: string;
  lastUpdated: Date;
}

export interface IComplianceUser {
  authUserId: string; // ID from the third-party auth service
  email: string;
  firstName: string;
  lastName: string;
  middleNames?: string;
  niNumber?: string;
  phone?: string;
  dateOfBirth?: string;
  profileImage?: string;
  onboardingStatus: IOnboardingStatus;
  isActive: boolean;
  isVerified: boolean; // Whether the user's onboarding has been verified/approved by admin
  createdAt: Date;
  updatedAt: Date;
}

const OnboardingStatusSchema = new Schema<IOnboardingStatus>({
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedSteps: [{
    type: String
  }],
  totalSteps: {
    type: Number,
    default: 0
  },
  currentStep: {
    type: String
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const UserSchema = new Schema<IComplianceUser>({
  authUserId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  middleNames: {
    type: String
  },
  niNumber: {
    type: String
  },
  phone: {
    type: String
  },
  dateOfBirth: {
    type: String
  },
  profileImage: {
    type: String
  },
  onboardingStatus: {
    type: OnboardingStatusSchema,
    default: () => ({
      isCompleted: false,
      completedSteps: [],
      totalSteps: 0,
      currentStep: undefined,
      lastUpdated: new Date()
    })
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Robust pattern to prevent model recompilation errors in Next.js
const ComplianceUser = (mongoose.models?.ComplianceUser as Model<IComplianceUser>) || 
  mongoose.model<IComplianceUser>("ComplianceUser", UserSchema);

export default ComplianceUser;