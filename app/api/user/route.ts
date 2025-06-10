import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import ComplianceUser from "@/lib/db/models/user";

// GET /api/user - Get user by authUserId
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const authUserId = searchParams.get("authUserId");
    const email = searchParams.get("email");

    if (!authUserId && !email) {
      return NextResponse.json(
        { error: "authUserId or email parameter is required" },
        { status: 400 }
      );
    }

    let user;
    if (authUserId) {
      user = await ComplianceUser.findOne({ legacyId: authUserId }).exec();
    } else {
      user = await ComplianceUser.findOne({ email }).exec();
    }

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/user - Create or update user
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { authUserId, email, firstName, lastName, ...otherData } = body;

    if (!authUserId || !email || !firstName || !lastName) {
      return NextResponse.json(
        { error: "authUserId, email, firstName, and lastName are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    let user = await ComplianceUser.findOne({ legacyId: authUserId }).exec();

    if (user) {
      // Update existing user
      Object.assign(user, otherData);
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;
      await user.save();
    } else {
      // Create new user
      user = new ComplianceUser({
        authUserId,
        email,
        firstName,
        lastName,
        ...otherData,
      });
      await user.save();
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error creating/updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/user - Update user onboarding status
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { authUserId, onboardingStatus } = body;

    if (!authUserId) {
      return NextResponse.json(
        { error: "authUserId is required" },
        { status: 400 }
      );
    }

    const user = await ComplianceUser.findOne({ legacyId: authUserId }).exec();

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (onboardingStatus) {
      user.onboardingStatus = {
        ...user.onboardingStatus,
        ...onboardingStatus,
        lastUpdated: new Date(),
      };
    }

    await user.save();

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
