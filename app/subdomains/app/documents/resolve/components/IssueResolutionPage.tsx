"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ComplianceItemType,
  MissingComplianceItemsList,
} from "./MissingComplianceItemsList";
import { documentsService } from "@/lib/documents";
import { useDocuments } from "@/app/hooks/documents";
import { useTrainings } from "@/app/hooks/trainings";
import { useReferences } from "@/app/subdomains/app/hooks/references";

export default function StaffIssueResolutionPage() {
  // Get documents, trainings, and references
  const { documentReferences, documents, getMissingDocuments } = useDocuments();

  const { trainings, trainingReferences } = useTrainings();

  const { references } = useReferences();

  // Get missing documents
  const missingDocuments = getMissingDocuments();

  // Get missing trainings by comparing references with user trainings
  // and also check for expired trainings
  const getMissingTrainings = () => {
    if (!trainingReferences || !trainings) return [];

    const userTrainingMap = new Map();
    
    // Create a map of user trainings with training_id as key
    trainings.forEach(training => {
      userTrainingMap.set(training.training_id, training);
    });
    
    // Get missing required trainings
    const missingTrainings = trainingReferences.filter(
      (ref) => !userTrainingMap.has(ref.id) && ref.is_required
    );
    
    // Get expired trainings
    const now = new Date();
    const expiredTrainings = [];
    
    trainingReferences.forEach(ref => {
      const userTraining = userTrainingMap.get(ref.id);
      if (userTraining) {
        const expiryDate = new Date(userTraining.date_expiring);
        if (expiryDate < now) {
          // Add expiration info to the reference
          expiredTrainings.push({
            ...ref,
            isExpired: true,
            expiryDate: userTraining.date_expiring
          });
        }
      }
    });
    
    return [...missingTrainings, ...expiredTrainings];
  };

  const missingTrainings = getMissingTrainings();

  // Check if user has at least 3 references
  const isMissingReferences = references && references.length < 3;

  return (
    <>
      <MissingComplianceItemsList
        itemType={ComplianceItemType.SYSTEM}
        title="Documents"
        items={missingDocuments}
      />

      <MissingComplianceItemsList
        itemType={ComplianceItemType.TRAININGS}
        title="Trainings"
        items={missingTrainings}
      />
      {isMissingReferences && (
        <MissingComplianceItemsList
          itemType={ComplianceItemType.REFERENCES}
          title="References"
          items={[
            {
              id: 0,
              name: "You need at least 3 references",
              is_required: true,
            },
          ]}
        />
      )}
    </>
  );
}
