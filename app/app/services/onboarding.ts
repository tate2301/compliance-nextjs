import axios from "axios";

export interface OnboardingStatus {
  isCompleted: boolean;
  completedSteps: string[];
  totalSteps: number;
  currentStep?: string;
  lastUpdated: Date;
}

export interface ComplianceUser {
  _id: string;
  authUserId: string;
  email: string;
  firstName: string;
  lastName: string;
  middleNames?: string;
  niNumber?: string;
  phone?: string;
  dateOfBirth?: string;
  profileImage?: string;
  onboardingStatus: OnboardingStatus;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const onboardingService = {
  // Create or update user in our database
  createOrUpdateUser: async (userData: {
    authUserId: string;
    email: string;
    firstName: string;
    lastName: string;
    [key: string]: any;
  }): Promise<ComplianceUser> => {
    try {
      const response = await axios.post("/api/user", userData);
      return response.data;
    } catch (error) {
      console.error("Error creating/updating user:", error);
      throw error;
    }
  },

  // Get user by authUserId
  getUserByAuthId: async (authUserId: string): Promise<ComplianceUser | null> => {
    try {
      const response = await axios.get(`/api/user?authUserId=${authUserId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  // Get user by email
  getUserByEmail: async (email: string): Promise<ComplianceUser | null> => {
    try {
      const response = await axios.get(`/api/user?email=${email}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  // Update onboarding status
  updateOnboardingStatus: async (
    authUserId: string,
    onboardingStatus: Partial<OnboardingStatus>
  ): Promise<ComplianceUser> => {
    try {
      const response = await axios.put("/api/user", {
        authUserId,
        onboardingStatus,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating onboarding status:", error);
      throw error;
    }
  },

  // Mark a step as completed
  completeStep: async (authUserId: string, stepId: string): Promise<ComplianceUser> => {
    try {
      // First get current user data
      const user = await onboardingService.getUserByAuthId(authUserId);
      if (!user) {
        throw new Error("User not found");
      }

      const completedSteps = [...user.onboardingStatus.completedSteps];
      if (!completedSteps.includes(stepId)) {
        completedSteps.push(stepId);
      }

      const isCompleted = completedSteps.length >= user.onboardingStatus.totalSteps;

      return await onboardingService.updateOnboardingStatus(authUserId, {
        completedSteps,
        isCompleted,
        lastUpdated: new Date(),
      });
    } catch (error) {
      console.error("Error completing step:", error);
      throw error;
    }
  },

  // Initialize onboarding for new user
  initializeOnboarding: async (
    authUserId: string,
    totalSteps: number
  ): Promise<ComplianceUser> => {
    try {
      return await onboardingService.updateOnboardingStatus(authUserId, {
        isCompleted: false,
        completedSteps: [],
        totalSteps,
        lastUpdated: new Date(),
      });
    } catch (error) {
      console.error("Error initializing onboarding:", error);
      throw error;
    }
  },
}; 