"use client";

import { useUser } from "@/app/hooks/user";
import { useAuth } from "@/lib/auth/auth-context";
import { documentsService } from "@/lib/documents";
import { useQuery } from "@tanstack/react-query";
import { MissingStaffDocumentsAlert } from "./MissingStaffDocumentsAlert";

export const GlobalComplianceAlert = () => {
  const { user: authUser } = useAuth();
  const { userData: userWithCompliance } = useUser();

  // Only show the alert if we have both the user with compliance data and documents data
  if (!userWithCompliance || !authUser) return null;

  // Only show the alert if the user is not compliant and has missing items
  if (
    !userWithCompliance.isCompliant ||
    (userWithCompliance.isCompliant &&
      !userWithCompliance.isCompliant.isCompliant &&
      userWithCompliance.isCompliant.missing &&
      userWithCompliance.isCompliant.missing.length > 0)
  ) {
    const missingDocuments = userWithCompliance.isCompliant.missing;

    return (
      <MissingStaffDocumentsAlert
        userFullname={`${authUser.first_name} ${authUser.last_name}`}
        missingDocuments={missingDocuments}
      />
    );
  }

  return null;
};
