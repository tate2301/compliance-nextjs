import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import ComplianceUser from "@/lib/db/models/user";
import { ComplianceForm } from "@/lib/db/models/document";
import { FormResponse } from "@/lib/db/models/form-response";
import {requireSession} from "@/lib/auth/acl";

// GET /api/user/onboarding-status - Check onboarding completion and verification status
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const session = await requireSession(request)
    const userId = session.user.id

    // Get user data
    const user = await ComplianceUser.findById(
      userId,
      { onboardingStatus: 1, isVerified: 1 }
    ).exec();

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check actual completion status by querying forms and responses
    const onboardingForms = await ComplianceForm.find({ 
      isMandatoryForOnboarding: true,
      status: 'active' 
    }).exec();

    if (onboardingForms.length === 0) {
      // No onboarding forms configured, consider complete
      return NextResponse.json({
        isCompleted: true,
        completedSteps: [],
        totalSteps: 0,
        lastUpdated: user.onboardingStatus?.lastUpdated,
        isVerified: user.isVerified || false
      });
    }

    // Check if user has completed responses for all onboarding forms
    const userResponses = await FormResponse.find({
      user: user._id,
      status: 'active'
    }).exec();

    const completedFormIds = new Set(userResponses.map(response => response.form.toString()));
    const requiredFormIds = onboardingForms.map(form => form._id.toString());
    
    // Check if all required forms have been completed
    const allFormsCompleted = requiredFormIds.every(formId => 
      completedFormIds.has(formId)
    );

    console.log('Onboarding status check:', {
      user_id: user._id,
      completedFormIds: Array.from(completedFormIds),
      requiredFormIds,
      allFormsCompleted,
      isVerified: user.isVerified
    });

    return NextResponse.json({
      isCompleted: allFormsCompleted,
      completedSteps: Array.from(completedFormIds),
      totalSteps: requiredFormIds.length,
    lastUpdated: user.onboardingStatus?.lastUpdated,
      isVerified: user.isVerified || false
    });
  } catch (error) {
    console.error("Error fetching onboarding status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 