import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import { FormResponse, FormResponseStatus } from "@/lib/db/models/form-response";
import { ComplianceForm } from "@/lib/db/models/document";

// GET /api/form-responses - Get form responses for a user
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const formId = searchParams.get("formId");
    const status = searchParams.get("status") as FormResponseStatus;

    if (!userId) {
      return NextResponse.json(
        { error: "userId parameter is required" },
        { status: 400 }
      );
    }

    let query: any = { user: userId };

    if (formId) {
      // Find the form document ID from formId
      const form = await ComplianceForm.findOne({ formId });
      if (form) {
        query.form = form._id;
      } else {
        return NextResponse.json([], { status: 200 });
      }
    }

    if (status && Object.values(FormResponseStatus).includes(status)) {
      query.status = status;
    }

    const responses = await FormResponse.find(query)
      .populate('form', 'formId title category isRequired isMandatoryForOnboarding validityPeriod')
      .sort({ createdAt: -1 });

    return NextResponse.json(responses);
  } catch (error) {
    console.error("Error fetching form responses:", error);
    return NextResponse.json(
      { error: "Failed to fetch form responses" },
      { status: 500 }
    );
  }
}

// POST /api/form-responses - Create or update a form response
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { userId, formId, formData, status = FormResponseStatus.INCOMPLETE } = body;

    if (!userId || !formId || !formData) {
      return NextResponse.json(
        { error: "userId, formId, and formData are required" },
        { status: 400 }
      );
    }

    // Find the form
    const form = await ComplianceForm.findOne({ formId });
    if (!form) {
      return NextResponse.json(
        { error: "Form not found" },
        { status: 404 }
      );
    }

    // Check if response already exists
    let response = await FormResponse.findOne({
      user: userId,
      form: form._id
    });

    const now = new Date();
    let expiryDate: Date | undefined;

    // Calculate expiry date if form has validity period
    if (form.validityPeriod) {
      expiryDate = new Date(now.getTime() + (form.validityPeriod * 24 * 60 * 60 * 1000));
    }

    if (response) {
      // Update existing response
      response.formData = formData;
      response.status = status;
      response.version = form.version;
      
      if (status !== FormResponseStatus.INCOMPLETE) {
        response.submittedAt = now;
      }
      
      if (expiryDate) {
        response.expiryDate = expiryDate;
      }

      await response.save();
    } else {
      // Create new response
      response = new FormResponse({
        form: form._id,
        user: userId,
        formData,
        status,
        version: form.version,
        submittedAt: status !== FormResponseStatus.INCOMPLETE ? now : undefined,
        expiryDate
      });

      await response.save();
    }

    // Populate form details in response
    await response.populate('form', 'formId title category isRequired isMandatoryForOnboarding validityPeriod');

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error creating/updating form response:", error);
    return NextResponse.json(
      { error: "Failed to create/update form response" },
      { status: 500 }
    );
  }
} 