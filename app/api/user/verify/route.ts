import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import ComplianceUser from "../model";

// PUT /api/user/verify - Verify/approve a user's onboarding
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { authUserId, isVerified } = body;

    if (!authUserId || typeof isVerified !== 'boolean') {
      return NextResponse.json(
        { error: "authUserId and isVerified (boolean) are required" },
        { status: 400 }
      );
    }

    const user = await ComplianceUser.findOne({ authUserId }).exec();

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if onboarding is completed before allowing verification
    if (!user.onboardingStatus?.isCompleted && isVerified) {
      return NextResponse.json(
        { error: "Cannot verify user who hasn't completed onboarding" },
        { status: 400 }
      );
    }

    user.isVerified = isVerified;
    await user.save();

    return NextResponse.json({
      message: `User ${isVerified ? 'verified' : 'unverified'} successfully`,
      user: {
        authUserId: user.authUserId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isVerified: user.isVerified,
        onboardingStatus: user.onboardingStatus
      }
    });
  } catch (error) {
    console.error("Error verifying user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 