import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import { DocumentReference, DocumentType } from "@/lib/db/models/document";
import { DocumentSubmission, DocumentSubmissionStatus } from "@/lib/db/models/form-response";
import ComplianceUser from "@/lib/db/models/user";
import {requireSession} from "@/lib/auth/acl";

// GET /api/documents - Get document references or user document submissions
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const session = await requireSession(request)
    const searchParams = request.nextUrl.searchParams;
    const userId = session.user.id
    const type = searchParams.get("type"); // 'references' or 'submissions'
    const category = searchParams.get("category");
    const documentType = searchParams.get("documentType");
    const status = searchParams.get("status");
    const mandatory = searchParams.get("mandatory");


    if(!userId) {
      throw Error("User ID not found")
    }

    const user = await ComplianceUser.findOne({id: userId})

    if (type === "submissions" && user) {
      // Get user's document submissions
      let query: any = { user: user._id };

      if (status && Object.values(DocumentSubmissionStatus).includes(status as DocumentSubmissionStatus)) {
        query.status = status;
      }

      const submissions = await DocumentSubmission.find(query)
        .populate('documentReference', 'name description category documentType isRequired isMandatoryForOnboarding validityPeriod allowedFileTypes')
        .populate('verifiedBy', 'first_name last_name email')
        .sort({ createdAt: -1 });

      return NextResponse.json(submissions);
    } else {
      // Get document references
      let query: any = {};

      if (category) {
        query.category = category;
      }

      if (documentType && Object.values(DocumentType).includes(documentType as DocumentType)) {
        query.documentType = documentType;
      }

      if (mandatory === 'true') {
        query.isMandatoryForOnboarding = true;
      }

      const references = await DocumentReference.find(query).sort({ name: 1 });
      return NextResponse.json(references);
    }
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}

// POST /api/documents - Create or update document submission
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const session = await requireSession(request)
    const userId = session.user.id

    const body = await request.json();
    const { 
      documentReferenceId,
      submissionData, 
      fileData, 
      status = DocumentSubmissionStatus.DRAFT 
    } = body;

    if (!userId || !documentReferenceId) {
      return NextResponse.json(
        { error: "userId and documentReferenceId are required" },
        { status: 400 }
      );
    }

    // Check if document reference exists
    const docRef = await DocumentReference.findById(documentReferenceId);
    if (!docRef) {
      return NextResponse.json(
        { error: "Document reference not found" },
        { status: 404 }
      );
    }

    // Validate submission data based on document type
    if (docRef.documentType === DocumentType.FORM && !submissionData) {
      return NextResponse.json(
        { error: "submissionData is required for form-type documents" },
        { status: 400 }
      );
    }

    if (docRef.documentType !== DocumentType.FORM && !fileData && status !== DocumentSubmissionStatus.DRAFT) {
      return NextResponse.json(
        { error: "fileData is required for file upload documents" },
        { status: 400 }
      );
    }

    // Check if submission already exists
    let submission = await DocumentSubmission.findOne({
      user: userId,
      documentReference: documentReferenceId
    });

    const now = new Date();
    let expiryDate: Date | undefined;

    // Calculate expiry date if document has validity period
    if (docRef.validityPeriod && status === DocumentSubmissionStatus.SUBMITTED) {
      expiryDate = new Date(now.getTime() + (docRef.validityPeriod * 24 * 60 * 60 * 1000));
    }

    if (submission) {
      // Update existing submission
      submission.submissionData = submissionData || submission.submissionData;
      submission.fileData = fileData || submission.fileData;
      submission.status = status;
      
      if (status === DocumentSubmissionStatus.SUBMITTED) {
        submission.submittedAt = now;
        submission.status = DocumentSubmissionStatus.PENDING_VERIFICATION;
      }
      
      if (expiryDate) {
        submission.expiryDate = expiryDate;
      }

      await submission.save();
    } else {
      // Create new submission
      submission = new DocumentSubmission({
        documentReference: documentReferenceId,
        user: userId,
        submissionData,
        fileData,
        status: status === DocumentSubmissionStatus.SUBMITTED ? DocumentSubmissionStatus.PENDING_VERIFICATION : status,
        submittedAt: status === DocumentSubmissionStatus.SUBMITTED ? now : undefined,
        expiryDate,
        version: 1
      });

      await submission.save();
    }

    // Populate references in response
    await submission.populate('documentReference', 'name description category documentType isRequired isMandatoryForOnboarding validityPeriod allowedFileTypes');

    return NextResponse.json(submission);
  } catch (error) {
    console.error("Error creating/updating document submission:", error);
    return NextResponse.json(
      { error: "Failed to create/update document submission" },
      { status: 500 }
    );
  }
}
