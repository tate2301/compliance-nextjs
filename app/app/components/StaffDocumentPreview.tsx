"use client";

import { EmptyState } from "@/app/components/ui/empty-state";
import Module from "@/components/Module/Module";
import { Button } from "@/components/ui/button";
import {
  FormPreview,
  FormPreviewRef,
} from "@/forms_builder/components/FormPreview";
import { FormProvider } from "@/forms_builder/context";
import { Form } from "@/forms_builder/types";
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

  const handleSubmitForm = () => {};

  return (
    <Module
      actions={
        <div className="flex gap-4">
          <Button variant="outline">Save as draft</Button>
          <Button>Submit</Button>
        </div>
      }
      title={documentData ? documentData.title : ""}
    >
      {documentData && (
        <div className="p-4">
          {documentData.description && (
            <p className="text-sand-10 mb-8  pb-4">
              {documentData.description}
            </p>
          )}
          <FormPreview
            form={documentData as unknown as Form}
            ref={formRef}
            onHandleSubmitForm={handleSubmitForm}
          />
        </div>
      )}
      {!documentData && (
        <EmptyState
          title="Loading form"
          description="Please wait while we load the form..."
        />
      )}
    </Module>
  );
}
