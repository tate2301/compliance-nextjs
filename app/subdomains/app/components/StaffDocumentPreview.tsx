"use client";

import {
  FormPreview,
  FormPreviewRef,
} from "@/forms_builder/components/FormPreview";
import { FormProvider } from "@/forms_builder/context";
import { documentsService } from "@/lib/documents";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";

export default function StaffDocumentPreview({
  documentId,
}: {
  documentId: string;
}) {
  const { data: documentData } = useQuery({
    queryKey: ["document", documentId],
    queryFn: () => documentsService.getDocumentById({ id: documentId }),
  });
  const formRef = useRef<FormPreviewRef>(null);

  console.log({ documentsData: documentData });

  const handleSubmitForm = () => {};

  return (
    <div>
      <FormProvider
        initialForm={JSON.stringify(documentData)}
        onFormChange={(form) => {
          // Handle form changes if needed
        }}
      >
        <FormPreview ref={formRef} onHandleSubmitForm={handleSubmitForm} />
      </FormProvider>
    </div>
  );
}
