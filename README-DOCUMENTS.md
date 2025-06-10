# Enhanced Documents Management System

This system provides a comprehensive local documents management solution that replaces the third-party service dependency.

## Features

- **Multiple Document Types**: Forms with fields, file uploads, training certificates, identity documents, and compliance documents
- **Automatic Categorization**: Documents are categorized into onboarding, legal, health, employment, assessment, and compliance
- **Verification Workflow**: Documents go through a pending verification state before being approved
- **Expiry Management**: Documents can have validity periods and automatic expiry
- **File Upload Support**: Support for PDF, DOC, DOCX, JPG, PNG files with configurable size limits
- **Admin Interface**: Comprehensive admin tools for verification and management

## Document Types

### FORM
Documents that contain fillable forms with defined fields that users complete on the website.

### FILE_UPLOAD
Documents that require users to upload files (PDFs, images, etc.).

### TRAINING_CERTIFICATE
Training and certification documents with automatic 1-year validity period.

### IDENTITY_DOCUMENT
Identity verification documents like passports, driving licenses, etc.

### COMPLIANCE_DOCUMENT
Compliance-related documents like DBS checks, right to work documentation.

## Document Status Flow

1. **DRAFT** - Document submission is saved but not yet submitted
2. **SUBMITTED** - User has submitted the document
3. **PENDING_VERIFICATION** - Document is awaiting admin verification (automatic status when submitted)
4. **VERIFIED** - Document has been approved by admin
5. **REJECTED** - Document has been rejected with reason
6. **EXPIRED** - Document has passed its validity period

## Setup and Migration

### 1. Import Document References

First, run the import script to migrate document references from the external service:

```bash
# Dry run to see what would be imported
npm run import-documents:dry-run

# Actual import
npm run import-documents
```

The import script will:
- Fetch document references from the external service
- Automatically categorize them based on name/reference patterns
- Set appropriate document types, validity periods, and file constraints
- Create or update existing document references

### 2. Database Models

The system includes several MongoDB models:

- **DocumentReference**: Defines available documents and their properties
- **DocumentSubmission**: Stores user submissions and their verification status
- **ComplianceForm**: Legacy form model (backward compatible)
- **FormResponse**: Legacy response model (backward compatible)

## API Endpoints

### Public Endpoints

- `GET /api/documents` - Get document references or user submissions
- `POST /api/documents` - Submit a new document
- `GET /api/documents/[id]` - Get specific document or submission
- `PUT /api/documents/[id]` - Update document submission
- `DELETE /api/documents/[id]` - Delete document submission

### Admin Endpoints

- `GET /api/documents/admin` - Get documents pending verification
- `PUT /api/documents/admin` - Verify or reject documents

## Frontend Usage

### React Hooks

```typescript
import { useDocuments, useAdminDocuments } from '@/app/hooks/documents';

// User document management
const {
  documentReferences,
  documentSubmissions,
  submitDocument,
  updateDocumentSubmission,
  deleteDocumentSubmission,
  getMissingDocuments,
  getComplianceStatus,
  isLoading
} = useDocuments();

// Admin document management
const {
  getDocumentsForVerification,
  verifyDocuments,
  rejectDocuments,
  isVerifying,
  isRejecting
} = useAdminDocuments();
```

### Services

```typescript
import { documentsService } from '@/app/app/services/documents';

// Get all document references
const references = await documentsService.getDocumentReferences({
  category: FormCategory.ONBOARDING,
  mandatory: true
});

// Submit a document
await documentsService.submitDocument({
  userId: "123",
  documentReferenceId: "ref-id",
  submissionData: { /* form data */ },
  fileData: { /* file info */ }
});

// Admin verification
await documentsService.verifyDocuments(
  ["submission-id-1", "submission-id-2"],
  "admin-user-id",
  "Verified - documents look good"
);
```

## Configuration

### Document Type Mapping

The import script uses configurable mappings to determine document types:

```typescript
const documentTypeMapping = {
  'dbs': DocumentType.COMPLIANCE_DOCUMENT,
  'right_to_work': DocumentType.IDENTITY_DOCUMENT,
  'training': DocumentType.TRAINING_CERTIFICATE,
  // ... add more mappings as needed
};
```

### Validity Periods

Different documents have different validity periods:

- Training certificates: 365 days (1 year)
- DBS checks: 1095 days (3 years)
- Right to work: 730 days (2 years)
- Others: No expiry (configurable)

### File Upload Constraints

```typescript
const allowedFileTypes = {
  TRAINING_CERTIFICATE: ['pdf', 'jpg', 'jpeg', 'png'],
  IDENTITY_DOCUMENT: ['pdf', 'jpg', 'jpeg', 'png'],
  COMPLIANCE_DOCUMENT: ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'],
  FILE_UPLOAD: ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png']
};
```

Default max file size: 10MB (configurable per document type)

## Backward Compatibility

The system maintains backward compatibility with the existing codebase:

- Legacy `useDocuments()` hook methods still work
- Old document and reference types are supported
- Existing components continue to function
- Gradual migration path available

## Migration Strategy

1. **Phase 1**: Import document references using the script
2. **Phase 2**: Update components to use enhanced document submissions
3. **Phase 3**: Implement admin verification workflow
4. **Phase 4**: Gradually migrate legacy components to new system
5. **Phase 5**: Remove external service dependency

## Admin Interface

The system provides admin tools for:

- Viewing documents pending verification
- Bulk verification/rejection of documents
- Adding verification notes
- Filtering by category, status, user
- Pagination for large document sets

## Security Considerations

- All user operations require user ID validation
- Admin operations require appropriate role permissions
- File uploads should be validated on server side
- Document references are public but submissions are user-scoped
- Verification actions are logged with admin user ID and timestamp

## Future Enhancements

- File storage integration (AWS S3, etc.)
- Document templates and auto-population
- Email notifications for verification status
- Document version history
- Bulk import/export capabilities
- API rate limiting and caching
- Advanced search and filtering
- Document analytics and reporting 