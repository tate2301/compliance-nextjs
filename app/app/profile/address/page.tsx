"use client";

import { EditableField } from "components/profile";
import { DashboardProfileLayout } from "@/components/Wrappers/dashboard-profile-layout";
import { useAddress } from "@/app/hooks/address";
import { useState } from "react";
import { toast } from "sonner";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";

export default function ProfileAddressPage() {
  const { address, isLoading, updateAddress, addAddress } = useAddress();
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleSave = async (field: string, value: string) => {
    const updateData = {
      ...address,
      [field]: value,
    };

    try {
      if (address) {
        await updateAddress(updateData);
      } else {
        await addAddress(updateData);
      }
      setActiveField(null);
      toast.success("Address updated successfully");
    } catch (error) {
      toast.error("Failed to update address");
    }
  };

  if (isLoading) {
    return <LoadingPlaceholder />
  }

  return (
    <DashboardProfileLayout
      title="Physical address"
      subtitle="Please provide an address where you can receive mail"
    >
      <EditableField
        label="Street address"
        value={address?.address_line_1 || ""}
        isEditing={activeField === "address_line_1"}
        onEdit={() => setActiveField("address_line_1")}
        onSave={(value) => handleSave("address_line_1", value)}
        onChange={() => {}}
        placeholder="Enter your street address"
      />
      <EditableField
        label="Street address line 2"
        value={address?.address_line_2 || ""}
        isEditing={activeField === "address_line_2"}
        onEdit={() => setActiveField("address_line_2")}
        onSave={(value) => handleSave("address_line_2", value)}
        onChange={() => {}}
        placeholder="Enter your street address line 2"
      />
      <EditableField
        label="Country"
        value={address?.country || ""}
        isEditing={activeField === "country"}
        onEdit={() => setActiveField("country")}
        onSave={(value) => handleSave("country", value)}
        onChange={() => {}}
        placeholder="Country"
      />
      <EditableField
        label="City"
        value={address?.city || ""}
        isEditing={activeField === "city"}
        onEdit={() => setActiveField("city")}
        onSave={(value) => handleSave("city", value)}
        onChange={() => {}}
        placeholder="City"
      />
      <EditableField
        label="Postal code"
        value={address?.postcode || ""}
        isEditing={activeField === "post_code"}
        onEdit={() => setActiveField("post_code")}
        onSave={(value) => handleSave("post_code", value)}
        onChange={() => {}}
        placeholder="Postal code"
      />
    </DashboardProfileLayout>
  );
}
