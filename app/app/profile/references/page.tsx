"use client";

import { DocumentItem } from "components/profile";
import { DashboardProfileLayout } from "@/components/Wrappers/dashboard-profile-layout";
import { useState } from "react";
import { useReferences } from "../../hooks/references";
import { Modal } from "@/app/components/ui/modal";
import { ReferenceForm } from "@/components/profile/reference-form";
import { Reference } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/solid";
import { toast } from "sonner";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";

export default function ProfilePage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedReference, setSelectedReference] = useState<Reference | null>(null);
  const { 
    references, 
    addReference, 
    updateReference, 
    removeReference, 
    isLoading,
    isAdding,
    isUpdating,
    isRemoving 
  } = useReferences();

  const handleAddReference = () => {
    setSelectedReference(null);
    setActiveModal("add_reference");
  };

  const handleEditReference = (reference: Reference) => {
    setSelectedReference(reference);
    setActiveModal("edit_reference");
  };

  const handleRemoveReference = async (id: number) => {
    try {
      await removeReference(id);
      toast.success("Reference removed successfully");
    } catch (error) {
      toast.error("Failed to remove reference");
    }
  };

  const handleSubmitReference = async (reference: Reference) => {
    try {
      if (selectedReference?.id) {
        await updateReference({
          ...reference,
          id: selectedReference.id,
          token: selectedReference.token
        });
        toast.success("Reference updated successfully");
        setActiveModal(null); // Only close modal on success
      } else {
        await addReference(reference);
        toast.success("Reference added successfully");
        setActiveModal(null); // Only close modal on success
      }
    } catch (error) {
      toast.error("Failed to save reference");
      // Modal stays open on error so user can try again
    }
  };

  if (isLoading) {
    return <LoadingPlaceholder />
  }

  return (
    <DashboardProfileLayout title="References" subtitle="Please note that references are subject to review">
      <div className="flex justify-end mb-4">
        <Button onClick={handleAddReference}>
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Reference
        </Button>
      </div>
      <div className="py-4 sm:gap-4">
        <dd className="mt-1 text-sm text-sand-12 sm:mt-0">
          {references.length > 0 ? (
            <ul
              role="list"
              className="border border-sand-6 rounded-md divide-y divide-sand-6"
            >
              {references.map((reference) => (
                <DocumentItem
                  key={reference.id}
                  fullname={`${reference.name} ${reference.surname}`}
                  email_address={reference.email}
                  updatedDate={reference.updated_at ? new Date(reference.updated_at).toLocaleDateString() : undefined}
                  onUpdate={() => handleEditReference(reference)}
                  onRemove={() => handleRemoveReference(reference.id!)}
                />
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-sand-10">
              No references added yet. Click the "Add Reference" button to add one.
            </div>
          )}
        </dd>
      </div>

      {/* Add/Edit Reference Modal */}
      <Modal
        isOpen={activeModal === "add_reference" || activeModal === "edit_reference"}
        onClose={() => {
          // Only allow closing if not in the middle of an operation
          if (!isAdding && !isUpdating) {
            setActiveModal(null);
          }
        }}
        onConfirm={() => document.forms[0].requestSubmit()}
        title={selectedReference ? "Edit Reference" : "Add Reference"}
        description="Please provide details about your reference"
        isLoading={isAdding || isUpdating} // Show loading state during operations
        size="md"
      >
        <ReferenceForm
          reference={selectedReference || undefined}
          onSubmit={handleSubmitReference}
        />
      </Modal>
    </DashboardProfileLayout>
  );
}
