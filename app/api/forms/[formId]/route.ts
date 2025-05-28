import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import { ComplianceForm } from "../../documents/model/Document";

interface Params {
  formId: string;
}

// GET /api/forms/[formId] - Get a specific form
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await dbConnect();

    const form = await ComplianceForm.findOne({ formId: params.formId });

    if (!form) {
      return NextResponse.json(
        { error: "Form not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(form);
  } catch (error) {
    console.error("Error fetching form:", error);
    return NextResponse.json(
      { error: "Failed to fetch form" },
      { status: 500 }
    );
  }
}

// PUT /api/forms/[formId] - Update a specific form
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await dbConnect();

    const body = await request.json();
    const updates = { ...body };

    // Remove immutable fields
    delete updates._id;
    delete updates.formId;
    delete updates.createdAt;

    const form = await ComplianceForm.findOneAndUpdate(
      { formId: params.formId },
      { ...updates, version: { $inc: 1 } },
      { new: true }
    );

    if (!form) {
      return NextResponse.json(
        { error: "Form not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(form);
  } catch (error) {
    console.error("Error updating form:", error);
    return NextResponse.json(
      { error: "Failed to update form" },
      { status: 500 }
    );
  }
} 