"use client";

import { EditableField } from "components/profile";
import { DashboardProfileLayout } from "@/components/Wrappers/dashboard-profile-layout";
import { useIdentification } from "@/app/hooks/identification";
import { useState } from "react";
import { toast } from "sonner";

export default function ProfileIdentificationPage() {
  const { identification, idReferences, isLoading, updateIdentification, addIdentification } = useIdentification();
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleSave = async (field: string, value: string) => {
    const updateData = {
      ...identification,
      [field]: value,
    };

    try {
      if (identification?.id) {
        await updateIdentification({ id: identification.id, identification: updateData });
      } else {
        await addIdentification(updateData);
      }
      setActiveField(null);
      toast.success("Identification information updated successfully");
    } catch (error) {
      toast.error("Failed to update identification information");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardProfileLayout
      title="Identification documents"
      subtitle="We require you provide government issued identity documents"
    >
      <EditableField
        label="ID Number"
        value={identification?.number || ""}
        isEditing={activeField === "number"}
        onEdit={() => setActiveField("number")}
        onSave={(value) => handleSave("number", value)}
        onChange={() => {}}
        placeholder="Enter your ID number"
      />
      <EditableField
        label="Issue Date"
        value={identification?.issue_date || ""}
        isEditing={activeField === "issue_date"}
        onEdit={() => setActiveField("issue_date")}
        onSave={(value) => handleSave("issue_date", value)}
        onChange={() => {}}
        placeholder="YYYY-MM-DD"
        type="date"
      />
      <EditableField
        label="Issued At"
        value={identification?.issued_at || ""}
        isEditing={activeField === "issued_at"}
        onEdit={() => setActiveField("issued_at")}
        onSave={(value) => handleSave("issued_at", value)}
        onChange={() => {}}
        placeholder="Enter place of issue"
      />
      <EditableField
        label="Expiry Date"
        value={identification?.expiry_date || ""}
        isEditing={activeField === "expiry_date"}
        onEdit={() => setActiveField("expiry_date")}
        onSave={(value) => handleSave("expiry_date", value)}
        onChange={() => {}}
        placeholder="YYYY-MM-DD"
        type="date"
      />
      <EditableField
        label="ID Type"
        value={identification?.type?.name || String(identification?.type_id) || ""}
        isEditing={activeField === "type_id"}
        onEdit={() => setActiveField("type_id")}
        onSave={(value) => handleSave("type_id", value)}
        onChange={() => {}}
        placeholder="Select ID type"
        type="select"
        options={
          idReferences?.map((ref) => ({
            value: String(ref.id),
            label: ref.name,
          })) || []
        }
      />
    </DashboardProfileLayout>
  );
}
