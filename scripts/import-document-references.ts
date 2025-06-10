import { DocumentReference, DocumentType, FormCategory, FormStatus } from "@/lib/db/models/document";
import dbConnect from "../lib/db/mongoose";
import { api } from "../lib/auth";

interface ExternalDocumentReference {
  id: number;
  name: string;
  reference: string;
  is_required?: boolean;
}

// Enhanced configuration for mapping external references to document types
const documentTypeMapping: Record<string, DocumentType> = {
  // Compliance documents
  'dbs': DocumentType.COMPLIANCE_DOCUMENT,
  'disclosure': DocumentType.COMPLIANCE_DOCUMENT,
  'barring': DocumentType.COMPLIANCE_DOCUMENT,
  'criminal': DocumentType.COMPLIANCE_DOCUMENT,
  'background': DocumentType.COMPLIANCE_DOCUMENT,
  'check': DocumentType.COMPLIANCE_DOCUMENT,
  'clearance': DocumentType.COMPLIANCE_DOCUMENT,
  
  // Identity documents
  'right_to_work': DocumentType.IDENTITY_DOCUMENT,
  'passport': DocumentType.IDENTITY_DOCUMENT,
  'driving': DocumentType.IDENTITY_DOCUMENT,
  'license': DocumentType.IDENTITY_DOCUMENT,
  'id': DocumentType.IDENTITY_DOCUMENT,
  'identification': DocumentType.IDENTITY_DOCUMENT,
  'identity': DocumentType.IDENTITY_DOCUMENT,
  'visa': DocumentType.IDENTITY_DOCUMENT,
  'immigration': DocumentType.IDENTITY_DOCUMENT,
  'birth': DocumentType.IDENTITY_DOCUMENT,
  'certificate': DocumentType.IDENTITY_DOCUMENT,
  
  // Training certificates
  'training': DocumentType.TRAINING_CERTIFICATE,
  'course': DocumentType.TRAINING_CERTIFICATE,
  'certification': DocumentType.TRAINING_CERTIFICATE,
  'cpd': DocumentType.TRAINING_CERTIFICATE,
  'ceu': DocumentType.TRAINING_CERTIFICATE,
  'qualification': DocumentType.TRAINING_CERTIFICATE,
  'diploma': DocumentType.TRAINING_CERTIFICATE,
  'degree': DocumentType.TRAINING_CERTIFICATE,
  
  // General file uploads
  'address': DocumentType.FILE_UPLOAD,
  'proof': DocumentType.FILE_UPLOAD,
  'statement': DocumentType.FILE_UPLOAD,
  'bill': DocumentType.FILE_UPLOAD,
  'utility': DocumentType.FILE_UPLOAD,
  'bank': DocumentType.FILE_UPLOAD,
  'reference': DocumentType.FILE_UPLOAD,
  'contract': DocumentType.FILE_UPLOAD,
  'agreement': DocumentType.FILE_UPLOAD,
  'insurance': DocumentType.FILE_UPLOAD,
  'medical': DocumentType.FILE_UPLOAD,
  'health': DocumentType.FILE_UPLOAD,
  'cv': DocumentType.FILE_UPLOAD,
  'resume': DocumentType.FILE_UPLOAD
};

const categoryMapping: Record<string, FormCategory> = {
  // Onboarding documents
  'identification': FormCategory.ONBOARDING,
  'identity': FormCategory.ONBOARDING,
  'address': FormCategory.ONBOARDING,
  'proof': FormCategory.ONBOARDING,
  'contact': FormCategory.ONBOARDING,
  'personal': FormCategory.ONBOARDING,
  'emergency': FormCategory.ONBOARDING,
  
  // Employment documents
  'right_to_work': FormCategory.EMPLOYMENT,
  'visa': FormCategory.EMPLOYMENT,
  'immigration': FormCategory.EMPLOYMENT,
  'reference': FormCategory.EMPLOYMENT,
  'contract': FormCategory.EMPLOYMENT,
  'agreement': FormCategory.EMPLOYMENT,
  'cv': FormCategory.EMPLOYMENT,
  'resume': FormCategory.EMPLOYMENT,
  'employment': FormCategory.EMPLOYMENT,
  'job': FormCategory.EMPLOYMENT,
  
  // Compliance documents
  'dbs': FormCategory.COMPLIANCE,
  'disclosure': FormCategory.COMPLIANCE,
  'barring': FormCategory.COMPLIANCE,
  'criminal': FormCategory.COMPLIANCE,
  'background': FormCategory.COMPLIANCE,
  'check': FormCategory.COMPLIANCE,
  'clearance': FormCategory.COMPLIANCE,
  'training': FormCategory.COMPLIANCE,
  'certification': FormCategory.COMPLIANCE,
  'qualification': FormCategory.COMPLIANCE,
  'cpd': FormCategory.COMPLIANCE,
  
  // Health documents
  'medical': FormCategory.HEALTH,
  'health': FormCategory.HEALTH,
  'vaccination': FormCategory.HEALTH,
  'immunization': FormCategory.HEALTH,
  'fitness': FormCategory.HEALTH,
  'occupational': FormCategory.HEALTH,
  
  // Legal documents
  'legal': FormCategory.LEGAL,
  'court': FormCategory.LEGAL,
  'tribunal': FormCategory.LEGAL,
  'lawsuit': FormCategory.LEGAL,
  'litigation': FormCategory.LEGAL,
  'insurance': FormCategory.LEGAL
};

// Comprehensive file types for different document types
const allowedFileTypesByType: Record<DocumentType, string[]> = {
  [DocumentType.FORM]: [], // Forms don't require file uploads
  [DocumentType.FILE_UPLOAD]: ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff'],
  [DocumentType.TRAINING_CERTIFICATE]: ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'],
  [DocumentType.IDENTITY_DOCUMENT]: ['pdf', 'jpg', 'jpeg', 'png', 'gif'],
  [DocumentType.COMPLIANCE_DOCUMENT]: ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png']
};

// Max file sizes by document type (in bytes)
const maxFileSizeByType: Record<DocumentType, number> = {
  [DocumentType.FORM]: 0, // No file uploads for forms
  [DocumentType.FILE_UPLOAD]: 15 * 1024 * 1024, // 15MB for general uploads
  [DocumentType.TRAINING_CERTIFICATE]: 10 * 1024 * 1024, // 10MB for certificates
  [DocumentType.IDENTITY_DOCUMENT]: 8 * 1024 * 1024, // 8MB for ID documents
  [DocumentType.COMPLIANCE_DOCUMENT]: 12 * 1024 * 1024 // 12MB for compliance docs
};

function determineDocumentType(reference: string, name: string): DocumentType {
  const searchText = `${reference} ${name}`.toLowerCase();
  
  // Check for specific patterns in reference or name
  for (const [key, type] of Object.entries(documentTypeMapping)) {
    if (searchText.includes(key)) {
      return type;
    }
  }
  
  // Smart defaults based on common patterns
  if (searchText.includes('form') || searchText.includes('application')) {
    return DocumentType.FORM;
  }
  
  // Default to file upload if no pattern matches
  return DocumentType.FILE_UPLOAD;
}

function determineCategory(reference: string, name: string): FormCategory {
  const searchText = `${reference} ${name}`.toLowerCase();
  
  // Check for specific patterns in reference or name
  for (const [key, category] of Object.entries(categoryMapping)) {
    if (searchText.includes(key)) {
      return category;
    }
  }
  
  // Smart defaults based on document type
  const documentType = determineDocumentType(reference, name);
  switch (documentType) {
    case DocumentType.IDENTITY_DOCUMENT:
      return FormCategory.ONBOARDING;
    case DocumentType.TRAINING_CERTIFICATE:
      return FormCategory.COMPLIANCE;
    case DocumentType.COMPLIANCE_DOCUMENT:
      return FormCategory.COMPLIANCE;
    default:
      return FormCategory.ONBOARDING; // Safe default for new users
  }
}

function isMandatoryForOnboarding(reference: string, name: string): boolean {
  const searchText = `${reference} ${name}`.toLowerCase();
  
  // Define which documents are mandatory for onboarding
  const onboardingMandatory = [
    'dbs', 'disclosure', 'right_to_work', 'identification', 'identity', 
    'address', 'proof', 'id', 'passport', 'driving', 'license'
  ];
  
  return onboardingMandatory.some(mandatory => searchText.includes(mandatory));
}

function isRequired(reference: string, name: string, externalRequired?: boolean): boolean {
  // Use external required flag if available
  if (externalRequired !== undefined) {
    return externalRequired;
  }
  
  const searchText = `${reference} ${name}`.toLowerCase();
  
  // Define which documents are typically required
  const typicallyRequired = [
    'dbs', 'disclosure', 'right_to_work', 'identification', 'identity',
    'training', 'certification', 'mandatory', 'required', 'essential'
  ];
  
  return typicallyRequired.some(keyword => searchText.includes(keyword));
}

function getValidityPeriod(documentType: DocumentType, reference: string, name: string): number | undefined {
  const searchText = `${reference} ${name}`.toLowerCase();
  
  // Set validity periods based on document type and content
  if (documentType === DocumentType.TRAINING_CERTIFICATE) {
    // Some training certificates have different validity periods
    if (searchText.includes('first aid') || searchText.includes('cpr')) {
      return 1095; // 3 years for first aid/CPR
    }
    if (searchText.includes('fire') || searchText.includes('safety')) {
      return 365; // 1 year for fire safety
    }
    return 730; // 2 years default for training certificates
  }
  
  if (documentType === DocumentType.COMPLIANCE_DOCUMENT) {
    if (searchText.includes('dbs') || searchText.includes('disclosure')) {
      return 1095; // 3 years for DBS
    }
    if (searchText.includes('medical') || searchText.includes('health')) {
      return 365; // 1 year for medical checks
    }
    return 1095; // 3 years default for compliance documents
  }
  
  if (documentType === DocumentType.IDENTITY_DOCUMENT) {
    if (searchText.includes('right_to_work') || searchText.includes('visa')) {
      return 730; // 2 years for right to work documents
    }
    // Most identity documents don't expire in our system
    return undefined;
  }
  
  return undefined; // No expiry for other documents
}

function generateDescription(name: string, reference: string, documentType: DocumentType, category: FormCategory): string {
  const typeDisplay = documentType.replace('_', ' ').toLowerCase();
  const categoryDisplay = category.charAt(0).toUpperCase() + category.slice(1);
  
  return `${categoryDisplay} ${typeDisplay}: ${name}`;
}

async function fetchExternalDocumentReferences(): Promise<ExternalDocumentReference[]> {
  try {
    console.log('Fetching document references from external service...');
    const response = await api.get('/documents/reference');
    return response.data;
  } catch (error) {
    console.error('Error fetching external document references:', error);
    throw error;
  }
}

async function importDocumentReferences(dryRun: boolean = false): Promise<void> {
  try {
    await dbConnect();
    console.log('Connected to database');

    const externalReferences = await fetchExternalDocumentReferences();
    console.log(`Found ${externalReferences.length} external document references`);

    const importResults = {
      created: 0,
      updated: 0,
      skipped: 0,
      errors: 0
    };

    for (const extRef of externalReferences) {
      try {
        // Determine all properties with smart defaults
        const documentType = determineDocumentType(extRef.reference, extRef.name);
        const category = determineCategory(extRef.reference, extRef.name);
        const isMandatory = isMandatoryForOnboarding(extRef.reference, extRef.name);
        const required = isRequired(extRef.reference, extRef.name, extRef.is_required);
        const validityPeriod = getValidityPeriod(documentType, extRef.reference, extRef.name);
        const allowedFileTypes = allowedFileTypesByType[documentType];
        const maxFileSize = maxFileSizeByType[documentType];
        const description = generateDescription(extRef.name, extRef.reference, documentType, category);

        const documentData = {
          referenceId: extRef.id.toString(),
          name: extRef.name,
          description,
          category,
          documentType,
          isRequired: required,
          isMandatoryForOnboarding: isMandatory,
          validityPeriod,
          allowedFileTypes: allowedFileTypes.length > 0 ? allowedFileTypes : undefined,
          maxFileSize: maxFileSize > 0 ? maxFileSize : undefined,
          status: FormStatus.ACTIVE
        };

        if (!dryRun) {
          const existingDoc = await DocumentReference.findOne({ 
            referenceId: extRef.id.toString() 
          });

          if (existingDoc) {
            await DocumentReference.findByIdAndUpdate(existingDoc._id, documentData);
            importResults.updated++;
            console.log(`Updated: ${extRef.name} (${extRef.reference}) - Type: ${documentType}, Category: ${category}, Required: ${required}`);
          } else {
            await DocumentReference.create(documentData);
            importResults.created++;
            console.log(`Created: ${extRef.name} (${extRef.reference}) - Type: ${documentType}, Category: ${category}, Required: ${required}`);
          }
        } else {
          console.log(`[DRY RUN] Would process: ${extRef.name} (${extRef.reference})`);
          console.log(`  - Type: ${documentType}`);
          console.log(`  - Category: ${category}`);
          console.log(`  - Required: ${required}`);
          console.log(`  - Mandatory for onboarding: ${isMandatory}`);
          console.log(`  - Validity period: ${validityPeriod ? `${validityPeriod} days` : 'No expiry'}`);
          console.log(`  - Max file size: ${maxFileSize ? `${Math.round(maxFileSize / (1024 * 1024))}MB` : 'N/A'}`);
          console.log(`  - Allowed file types: ${allowedFileTypes.length > 0 ? allowedFileTypes.join(', ') : 'N/A'}`);
          console.log(`  - Description: ${description}`);
          console.log('');
          importResults.created++;
        }

      } catch (error) {
        console.error(`Error processing reference ${extRef.id}:`, error);
        importResults.errors++;
      }
    }

    console.log('\nImport completed:');
    console.log(`- Created: ${importResults.created}`);
    console.log(`- Updated: ${importResults.updated}`);
    console.log(`- Skipped: ${importResults.skipped}`);
    console.log(`- Errors: ${importResults.errors}`);

    if (dryRun) {
      console.log('\nThis was a dry run. No changes were made to the database.');
      console.log('Run without --dry-run flag to perform the actual import.');
    }

  } catch (error) {
    console.error('Import failed:', error);
    throw error;
  }
}

// CLI support
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  
  if (dryRun) {
    console.log('Running in DRY RUN mode - no changes will be made to database');
  }

  try {
    await importDocumentReferences(dryRun);
    console.log('Document references import completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { importDocumentReferences }; 