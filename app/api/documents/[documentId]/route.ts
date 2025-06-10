import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import { DocumentReference } from "@/lib/db/models/document";
import { DocumentSubmission, DocumentSubmissionStatus } from "@/lib/db/models/form-response";
import {requireSession} from "@/lib/auth/acl";

// GET /api/documents/[documentId] - Get specific document reference or submission
export async function GET(
  request: NextRequest,
  { params }: { params: { documentId: string } }
) {
  try {
    await dbConnect();

    const session = await requireSession(request)
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type"); // 'reference' or 'submission'
    const userId = session.user.id

    if (type === "submission" && userId) {
      // Get user's specific document submission
      const submission = await DocumentSubmission.findOne({
        _id: params.documentId,
        user: userId
      })
        .populate('documentReference', 'name description category documentType isRequired isMandatoryForOnboarding validityPeriod allowedFileTypes formDefinition')
        .populate('verifiedBy', 'first_name last_name email');

      if (!submission) {
        return NextResponse.json(
          { error: "Document submission not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(submission);
    } else {
      // Get document reference
      const reference = await DocumentReference.findById(params.documentId);

      if (!reference) {
        return NextResponse.json(
          { error: "Document reference not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(reference);
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return NextResponse.json(
      { error: "Failed to fetch document" },
      { status: 500 }
    );
  }
}

// PUT /api/documents/[documentId] - Update document reference or submission
export async function PUT(
  request: NextRequest,
  { params }: { params: { documentId: string } }
) {
  try {
    await dbConnect();

    const body = await request.json();
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type"); // 'reference' or 'submission'
    const userId = searchParams.get("userId");

    if (type === "submission" && userId) {
      // Update user's document submission
      const { submissionData, fileData, status } = body;

      const submission = await DocumentSubmission.findOne({
        _id: params.documentId,
        user: userId
      });

      if (!submission) {
        return NextResponse.json(
          { error: "Document submission not found" },
          { status: 404 }
        );
      }

      // Update fields
      if (submissionData !== undefined) {
        submission.submissionData = submissionData;
      }
      if (fileData !== undefined) {
        submission.fileData = fileData;
      }
      if (status !== undefined) {
        submission.status = status;
        
        if (status === DocumentSubmissionStatus.SUBMITTED) {
          submission.submittedAt = new Date();
          submission.status = DocumentSubmissionStatus.PENDING_VERIFICATION;
        }
      }

      await submission.save();
      await submission.populate('documentReference', 'name description category documentType isRequired isMandatoryForOnboarding validityPeriod allowedFileTypes');

      return NextResponse.json(submission);
    } else {
      // Update document reference (admin function)
      const updatedReference = await DocumentReference.findByIdAndUpdate(
        params.documentId,
        body,
        { new: true, runValidators: true }
      );

      if (!updatedReference) {
        return NextResponse.json(
          { error: "Document reference not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(updatedReference);
    }
  } catch (error) {
    console.error("Error updating document:", error);
    return NextResponse.json(
      { error: "Failed to update document" },
      { status: 500 }
    );
  }
}

// DELETE /api/documents/[documentId] - Delete document submission or reference
export async function DELETE(
  request: NextRequest,
  { params }: { params: { documentId: string } }
) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type"); // 'reference' or 'submission'
    const userId = searchParams.get("userId");

    if (type === "submission" && userId) {
      // Delete user's document submission
      const submission = await DocumentSubmission.findOneAndDelete({
        _id: params.documentId,
        user: userId
      });

      if (!submission) {
        return NextResponse.json(
          { error: "Document submission not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ message: "Document submission deleted successfully" });
    } else {
      // Delete document reference (admin function)
      const reference = await DocumentReference.findByIdAndDelete(params.documentId);

      if (!reference) {
        return NextResponse.json(
          { error: "Document reference not found" },
          { status: 404 }
        );
      }

      // Also delete all related submissions
      await DocumentSubmission.deleteMany({ documentReference: params.documentId });

      return NextResponse.json({ message: "Document reference and related submissions deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json(
      { error: "Failed to delete document" },
      { status: 500 }
    );
  }
} 