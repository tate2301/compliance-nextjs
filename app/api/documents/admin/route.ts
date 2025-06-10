import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import { DocumentSubmission, DocumentSubmissionStatus } from "@/lib/db/models/form-response";
import { DocumentReference } from "@/lib/db/models/document";

// GET /api/documents/admin - Get documents pending verification or all submissions for admin review
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status") as DocumentSubmissionStatus;
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    let query: any = {};

    // Filter by status (default to pending verification)
    if (status && Object.values(DocumentSubmissionStatus).includes(status)) {
      query.status = status;
    } else {
      query.status = DocumentSubmissionStatus.PENDING_VERIFICATION;
    }

    // Filter by category if provided
    if (category) {
      const docRefs = await DocumentReference.find({ category }).select('_id');
      query.documentReference = { $in: docRefs.map(ref => ref._id) };
    }

    const [submissions, total] = await Promise.all([
      DocumentSubmission.find(query)
        .populate('documentReference', 'name description category documentType isRequired isMandatoryForOnboarding validityPeriod')
        .populate('user', 'first_name last_name email')
        .populate('verifiedBy', 'first_name last_name email')
        .sort({ submittedAt: -1 })
        .skip(skip)
        .limit(limit),
      DocumentSubmission.countDocuments(query)
    ]);

    return NextResponse.json({
      submissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching admin documents:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin documents" },
      { status: 500 }
    );
  }
}

// PUT /api/documents/admin - Verify or reject document submissions
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { 
      submissionIds, 
      action, 
      verifiedBy, 
      rejectionReason, 
      verificationNotes 
    } = body;

    if (!submissionIds || !Array.isArray(submissionIds) || submissionIds.length === 0) {
      return NextResponse.json(
        { error: "submissionIds array is required" },
        { status: 400 }
      );
    }

    if (!action || !['verify', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: "action must be 'verify' or 'reject'" },
        { status: 400 }
      );
    }

    if (!verifiedBy) {
      return NextResponse.json(
        { error: "verifiedBy is required" },
        { status: 400 }
      );
    }

    if (action === 'reject' && !rejectionReason) {
      return NextResponse.json(
        { error: "rejectionReason is required for rejection" },
        { status: 400 }
      );
    }

    const now = new Date();
    const updateData: any = {
      verifiedBy,
      verifiedAt: now,
      verificationNotes
    };

    if (action === 'verify') {
      updateData.status = DocumentSubmissionStatus.VERIFIED;
    } else {
      updateData.status = DocumentSubmissionStatus.REJECTED;
      updateData.rejectionReason = rejectionReason;
    }

    const result = await DocumentSubmission.updateMany(
      { 
        _id: { $in: submissionIds },
        status: DocumentSubmissionStatus.PENDING_VERIFICATION
      },
      updateData
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "No pending submissions found with provided IDs" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: `Successfully ${action}ed ${result.modifiedCount} document submissions`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error("Error verifying documents:", error);
    return NextResponse.json(
      { error: "Failed to verify documents" },
      { status: 500 }
    );
  }
} 