# Forms and Document Management System

This document explains the new integrated forms and document management system that replaces the static JotForm integration with a dynamic, database-driven approach.

## Overview

The system now stores forms in MongoDB and tracks user responses with proper status management, expiry dates, and onboarding integration. Forms can be marked as mandatory for onboarding or optional for the documents section.

## Database Models

### ComplianceForm Model
```typescript
interface IComplianceForm {
  formId: string;           // Unique identifier
  title: string;            // Form title
  description: string;      // Form description
  category: FormCategory;   // onboarding, legal, health, employment, assessment
  isRequired: boolean;      // Whether form is required
  isMandatoryForOnboarding: boolean; // Whether required for onboarding
  jotFormId?: string;       // Original JotForm ID (for migration)
  jotFormUrl?: string;      // Original JotForm URL
  formDefinition: {         // The actual form structure
    fields: FormField[];
    theme?: FormTheme;
  };
  validityPeriod?: number;  // Days until response expires
  status: FormStatus;       // draft, active, archived
  version: number;          // Version tracking
}
```

### FormResponse Model
```typescript
interface IFormResponse {
  form: string;             // Reference to ComplianceForm
  user: string;             // Reference to ComplianceUser
  formData: Record<string, any>; // User's form submission
  status: FormResponseStatus;    // incomplete, reviewing, rejected, archived, active
  submittedAt?: Date;       // When form was submitted
  reviewedAt?: Date;        // When response was reviewed
  reviewedBy?: string;      // Who reviewed it
  expiryDate?: Date;        // When response expires
  rejectionReason?: string; // Reason for rejection
  notes?: string;           // Admin notes
  version: number;          // Form version when submitted
}
```

## API Endpoints

### Forms API (`/api/forms`)
- `GET /api/forms` - Get all forms with filtering
  - Query params: `category`, `onboarding`, `status`
- `POST /api/forms` - Create a new form
- `GET /api/forms/[formId]` - Get specific form
- `PUT /api/forms/[formId]` - Update specific form

### Form Responses API (`/api/form-responses`)
- `GET /api/form-responses` - Get user's form responses
  - Query params: `userId`, `formId`, `status`
- `POST /api/form-responses` - Submit/update form response

## Services

### Forms Service (`app/app/services/forms.ts`)
Handles all form-related operations:
- `getAllForms()` - Fetch forms with filtering
- `getOnboardingForms()` - Get onboarding-specific forms
- `getFormById()` - Get individual form
- `getUserFormResponses()` - Get user's responses
- `submitFormResponse()` - Submit form data
- `getFormsWithUserResponses()` - Get forms with completion status
- `getOnboardingProgress()` - Calculate onboarding completion
- `isOnboardingComplete()` - Check if user completed onboarding

### Onboarding Service (`app/app/services/onboarding.ts`)
Manages user onboarding state:
- `createOrUpdateUser()` - Create/update user in database
- `getUserByAuthId()` - Get user by auth ID
- `updateOnboardingStatus()` - Update completion status
- `completeStep()` - Mark onboarding step complete

## Form Status Flow

### Form Response Statuses
1. **INCOMPLETE** - Form started but not submitted
2. **REVIEWING** - Form submitted, pending review
3. **REJECTED** - Form rejected, needs resubmission
4. **ACTIVE** - Form approved and currently valid
5. **ARCHIVED** - Form was active but now archived

### Status Transitions
```
INCOMPLETE → REVIEWING (on submission)
REVIEWING → ACTIVE (on approval)
REVIEWING → REJECTED (on rejection)
REJECTED → REVIEWING (on resubmission)
ACTIVE → ARCHIVED (manual archive or expiry)
```

## Database Seeding

### Initial Setup
1. Install dependencies: `npm install tsx`
2. Set environment variables:
   - `MONGODB_URI` - MongoDB connection string
   - `JOTFORM_API_KEY` - JotForm API key for migration
3. Run seeding: `npm run seed`

### Seeding Script (`scripts/seed-forms.ts`)
The script:
- Connects to MongoDB
- Fetches form definitions from JotForm API
- Converts JotForm format to our database format
- Stores forms with proper categorization and settings
- Handles existing forms (skips duplicates)

### Seeded Forms
- **TCS CV Template** (onboarding, required)
- **Employee Handbook Acknowledgement** (onboarding, required)
- **Employee Manual Acknowledgement** (onboarding, required)
- **Numeracy and Literacy Quiz** (onboarding, required)
- **Confidentiality Agreement** (legal, required)
- **Health Assessment** (health, required, expires yearly)
- **48hr Opt Out** (employment, optional)
- **Temporary Worker Contract** (employment, required)

## Onboarding Flow

### Updated Process
1. User authenticates via third-party API
2. System checks if user exists in our MongoDB
3. If not, creates user record with onboarding status
4. Fetches onboarding forms from database (not static data)
5. User completes forms, responses stored in MongoDB
6. System tracks completion and redirects when done

### Integration Points
- **OnboardingGuard** - Protects routes, redirects incomplete users
- **useOnboardingStatus** - Manages onboarding state from database
- **useOnboarding** - Handles form navigation and submission
- **OnboardingHeader** - Clean header for onboarding flow

## Documents Page Integration

Forms also appear in the main documents section when:
- `isMandatoryForOnboarding: false` 
- User needs to complete optional compliance forms
- Forms have expired and need renewal

The same form system powers both onboarding and ongoing compliance.

## Key Features

### ✅ **Database-Driven Forms**
- Forms stored in MongoDB, not static files
- Version tracking and change management
- Flexible categorization and requirements

### ✅ **Response Management**
- Complete form submission tracking
- Status workflow (incomplete → reviewing → active)
- Expiry date management for time-sensitive forms

### ✅ **Onboarding Integration**
- Seamless integration with existing auth flow
- Progress tracking and completion detection
- Route protection until onboarding complete

### ✅ **Admin Features**
- Form approval/rejection workflow
- Admin notes and rejection reasons
- Response review and management

### ✅ **Migration Support**
- Maintains JotForm IDs for reference
- Automated migration via seeding script
- Backward compatibility during transition

## Usage Examples

### Check Onboarding Status
```typescript
const { isOnboardingComplete, progressPercentage } = useOnboardingStatus();
```

### Get User's Forms
```typescript
const forms = await formsService.getFormsWithUserResponses(userId, {
  onboardingOnly: true
});
```

### Submit Form Response
```typescript
await formsService.submitFormResponse({
  userId: "user123",
  formId: "tcs-cv", 
  formData: { name: "John Doe", ... },
  status: FormResponseStatus.ACTIVE
});
```

### Seed Database
```bash
npm run seed
```

This creates a complete, integrated system where forms are managed in the database, user responses are properly tracked, and the onboarding flow is seamlessly integrated with the main application. 