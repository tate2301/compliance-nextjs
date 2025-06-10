#!/usr/bin/env tsx

import dotenv from 'dotenv';
dotenv.config();

import dbConnect from "../lib/db/mongoose";
import { ComplianceForm, FormCategory, FormStatus } from "@/lib/db/models/document";
import { getJotFormById } from "../app/actions/forms";

// Validate required environment variables
if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI environment variable is required");
  process.exit(1);
}

if (!process.env.JOTFORM_API_KEY) {
  console.error("❌ JOTFORM_API_KEY environment variable is required");
  process.exit(1);
}

// Form definitions from the existing compliance-forms data
const formsToSeed = [
  {
    formId: "tcs-cv",
    title: "TCS CV Template",
    jotFormUrl: "https://form.jotform.com/221501404417038",
    jotFormId: "221501404417038",
    category: FormCategory.ONBOARDING,
    description: "Comprehensive CV template for TCS applications",
    isRequired: true,
    isMandatoryForOnboarding: true,
  },
  {
    formId: "handbook-acknowledgement", 
    title: "Employee Handbook Acknowledgement",
    jotFormUrl: "https://form.jotform.com/202802321916548",
    jotFormId: "202802321916548",
    category: FormCategory.ONBOARDING,
    description: "Acknowledgement of receiving and understanding the employee handbook",
    isRequired: true,
    isMandatoryForOnboarding: true,
  },
  {
    formId: "employee-manual",
    title: "Employee Manual Acknowledgement", 
    jotFormUrl: "http://jotformeu.com/83444447608362",
    jotFormId: "83444447608362",
    category: FormCategory.ONBOARDING,
    description: "Acknowledgement of receiving and understanding the employee manual",
    isRequired: true,
    isMandatoryForOnboarding: true,
  },
  {
    formId: "confidentiality-agreement",
    title: "Confidentiality Agreement",
    jotFormUrl: "https://form.jotform.com/203003202135028", 
    jotFormId: "203003202135028",
    category: FormCategory.LEGAL,
    description: "Agreement to maintain confidentiality of company information",
    isRequired: true,
    isMandatoryForOnboarding: true,
  },
  {
    formId: "health-assessment",
    title: "Annual Health Assessment Questionnaire",
    jotFormUrl: "https://form.jotform.com/202722153489052",
    jotFormId: "202722153489052",
    category: FormCategory.HEALTH,
    description: "Annual health assessment for employees",
    isRequired: true,
    isMandatoryForOnboarding: true,
    validityPeriod: 365, // Valid for 1 year
  },
  {
    formId: "48hr-opt-out",
    title: "48hr Opt Out",
    jotFormUrl: "https://form.jotform.com/200262051908345",
    jotFormId: "200262051908345", 
    category: FormCategory.EMPLOYMENT,
    description: "Form to opt out of the 48-hour working week limit",
    isRequired: true,
    isMandatoryForOnboarding: true,
  },
  {
    formId: "temporary-worker-contract",
    title: "Temporary Workers Contract for Services",
    jotFormUrl: "https://form.jotform.com/202803657435557",
    jotFormId: "202803657435557",
    category: FormCategory.EMPLOYMENT,
    description: "Contract for temporary workers",
    isRequired: true,
    isMandatoryForOnboarding: true,
  },
  {
    formId: "numeracy-literacy",
    title: "Numeracy and Literacy Quiz",
    jotFormUrl: "https://form.jotform.com/202714678035052",
    jotFormId: "202714678035052",
    category: FormCategory.ASSESSMENT,
    description: "Assessment of basic numeracy and literacy skills",
    isRequired: true,
    isMandatoryForOnboarding: true,
  },
];

async function seedForms() {
  try {
    console.log("🌱 Starting form seeding process...");
    console.log(`📋 Planning to seed ${formsToSeed.length} forms`);
    
    await dbConnect();
    console.log("✅ Connected to database");

    let seededCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const formConfig of formsToSeed) {
      try {
        console.log(`\n📝 Processing form: ${formConfig.title}`);

        // Check if form already exists
        const existingForm = await ComplianceForm.findOne({ formId: formConfig.formId });
        if (existingForm) {
          console.log(`⚠️  Form ${formConfig.formId} already exists, skipping...`);
          skippedCount++;
          continue;
        }

        // Fetch form definition from JotForm
        console.log(`🔍 Fetching form definition from JotForm...`);
        const formDefinition = await getJotFormById(formConfig.jotFormId);
        
        console.log(`📋 Form has ${formDefinition.fields.length} fields`);
        
        // Create new form in database
        const newForm = new ComplianceForm({
          formId: formConfig.formId,
          title: formConfig.title,
          description: formConfig.description,
          category: formConfig.category,
          isRequired: formConfig.isRequired,
          isMandatoryForOnboarding: formConfig.isMandatoryForOnboarding,
          jotFormId: formConfig.jotFormId,
          jotFormUrl: formConfig.jotFormUrl,
          formDefinition: {
            fields: formDefinition.fields,
            theme: formDefinition.theme
          },
          validityPeriod: formConfig.validityPeriod,
          status: FormStatus.ACTIVE,
          version: 1,
        });

        await newForm.save();
        console.log(`✅ Successfully seeded form: ${formConfig.title}`);
        seededCount++;

        // Add a small delay to avoid hitting rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        console.error(`❌ Error seeding form ${formConfig.title}:`, error);
        errorCount++;
      }
    }

    console.log("\n🎉 Form seeding completed!");
    console.log(`📊 Summary:`);
    console.log(`   ✅ Seeded: ${seededCount} forms`);
    console.log(`   ⚠️  Skipped: ${skippedCount} forms`);
    console.log(`   ❌ Errors: ${errorCount} forms`);

    // Show final count in database
    const totalFormsInDb = await ComplianceForm.countDocuments();
    const onboardingFormsInDb = await ComplianceForm.countDocuments({ isMandatoryForOnboarding: true });
    console.log(`\n📈 Database summary:`);
    console.log(`   📄 Total forms in database: ${totalFormsInDb}`);
    console.log(`   🎯 Onboarding forms in database: ${onboardingFormsInDb}`);

    if (errorCount > 0) {
      console.log("\n⚠️  Some forms failed to seed. Check the errors above.");
      process.exit(1);
    }

  } catch (error) {
    console.error("💥 Fatal error during seeding:", error);
    process.exit(1);
  }
}

// Only run if called directly (not imported)
if (require.main === module) {
  seedForms()
    .then(() => {
      console.log("\n🏁 Seeding process finished successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Seeding process failed:", error);
      process.exit(1);
    });
}

export { seedForms }; 