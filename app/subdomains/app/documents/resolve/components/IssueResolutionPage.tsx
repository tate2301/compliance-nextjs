"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ComplianceItemType,
  MissingComplianceItemsList,
} from "./MissingComplianceItemsList";
import { documentsService } from "@/lib/documents";

export default function StaffIssueResolutionPage() {
  const { data: missingDocuments } = useQuery({
    queryKey: ["documents"],
    queryFn: () => documentsService.getDocuments(),
  });

  console.log("Missing documents:", missingDocuments);

  return (
    <>
      <MissingComplianceItemsList
        itemType={ComplianceItemType.DOCUMENTS}
        title="Documents"
        items={missingDocuments}
      />
      <MissingComplianceItemsList
        itemType={ComplianceItemType.TRAININGS}
        title="Trainings"
        items={[]}
      />
      <MissingComplianceItemsList
        itemType={ComplianceItemType.REFERENCES}
        title="References"
        items={missingDocuments}
      />
    </>
  );
}
