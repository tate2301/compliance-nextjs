"use client";

import { EditableField } from "components/profile";
import { DashboardProfileLayout } from "@/components/Wrappers/dashboard-profile-layout";
import { useDbs } from "@/app/hooks/dbs";
import { useState } from "react";
import { toast } from "sonner";

export default function ProfileDbsPage() {
  const { dbs, dbsReferences, isLoading, updateDbs, addDbs } = useDbs();
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleSave = async (field: string, value: string) => {
    const updateData = {
      ...dbs,
      [field]: value,
    };

    try {
      if (dbs?.id) {
        await updateDbs({ id: dbs.id, dbs: updateData });
      } else {
        await addDbs(updateData);
      }
      setActiveField(null);
      toast.success("DBS information updated successfully");
    } catch (error) {
      toast.error("Failed to update DBS information");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardProfileLayout
      title="DBS Information"
      subtitle="Please provide your DBS (Disclosure and Barring Service) details"
    >
      <EditableField
        label="DBS Number"
        value={dbs?.dbs_number || ""}
        isEditing={activeField === "dbs_number"}
        onEdit={() => setActiveField("dbs_number")}
        onSave={(value) => handleSave("dbs_number", value)}
        onChange={() => {}}
        placeholder="Enter your DBS number"
      />
      <EditableField
        label="Date Issued"
        value={dbs?.date_issued || ""}
        isEditing={activeField === "date_issued"}
        onEdit={() => setActiveField("date_issued")}
        onSave={(value) => handleSave("date_issued", value)}
        onChange={() => {}}
        placeholder="YYYY-MM-DD"
        type="date"
      />
      <EditableField
        label="Expiry Date"
        value={dbs?.date_expiring || ""}
        isEditing={activeField === "date_expiring"}
        onEdit={() => setActiveField("date_expiring")}
        onSave={(value) => handleSave("date_expiring", value)}
        onChange={() => {}}
        placeholder="YYYY-MM-DD"
        type="date"
      />
      <EditableField
        label="DBS Type"
        value={dbs?.type?.name || String(dbs?.dbs_type) || ""}
        isEditing={activeField === "dbs_type"}
        onEdit={() => setActiveField("dbs_type")}
        onSave={(value) => handleSave("dbs_type", value)}
        onChange={() => {}}
        placeholder="Select DBS type"
        type="select"
        options={
          dbsReferences?.map((ref) => ({
            value: String(ref.id),
            label: ref.name,
          })) || []
        }
      />
    </DashboardProfileLayout>
  );
}
