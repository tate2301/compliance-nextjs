import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import { ComplianceForm, FormCategory, FormStatus } from "../documents/model/Document";

// GET /api/forms - Get all forms or filtered forms
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category") as FormCategory;
    const onboardingOnly = searchParams.get("onboarding") === "true";
    const status = searchParams.get("status") as FormStatus;

    let query: any = {};

    // Filter by category
    if (category && Object.values(FormCategory).includes(category)) {
      query.category = category;
    }

    // Filter by onboarding requirement
    if (onboardingOnly) {
      query.isMandatoryForOnboarding = true;
    }

    // Filter by status
    if (status && Object.values(FormStatus).includes(status)) {
      query.status = status;
    } else {
      // Default to active forms only
      query.status = FormStatus.ACTIVE;
    }

    const forms = await ComplianceForm.find(query).sort({ category: 1, title: 1 }).exec();

    return NextResponse.json(forms);
  } catch (error) {
    console.error("Error fetching forms:", error);
    return NextResponse.json(
      { error: "Failed to fetch forms" },
      { status: 500 }
    );
  }
}

// POST /api/forms - Create a new form
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const {
      formId,
      title,
      description,
      category,
      isRequired,
      isMandatoryForOnboarding,
      jotFormId,
      jotFormUrl,
      formDefinition,
      validityPeriod,
    } = body;

    if (!formId || !title || !description || !category || !formDefinition) {
      return NextResponse.json(
        { error: "Missing required fields: formId, title, description, category, formDefinition" },
        { status: 400 }
      );
    }

    // Check if form with this ID already exists
    const existingForm = await ComplianceForm.findOne({ formId }).exec();
    if (existingForm) {
      return NextResponse.json(
        { error: "Form with this ID already exists" },
        { status: 409 }
      );
    }

    const newForm = new ComplianceForm({
      formId,
      title,
      description,
      category,
      isRequired: isRequired || false,
      isMandatoryForOnboarding: isMandatoryForOnboarding || false,
      jotFormId,
      jotFormUrl,
      formDefinition,
      validityPeriod,
      status: FormStatus.ACTIVE,
      version: 1,
    });

    await newForm.save();

    return NextResponse.json(newForm, { status: 201 });
  } catch (error) {
    console.error("Error creating form:", error);
    return NextResponse.json(
      { error: "Failed to create form" },
      { status: 500 }
    );
  }
} 