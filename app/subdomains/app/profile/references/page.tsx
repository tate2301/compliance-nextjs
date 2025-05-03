"use client";

import { DocumentItem } from "@/app/components/profile";
import { DashboardProfileLayout } from "@/components/Wrappers/dashboard-profile-layout";
import { useState } from "react";

export default function ProfilePage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <DashboardProfileLayout>
      <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
        <dd className="mt-1 text-sm text-slate-12 sm:mt-0 sm:col-span-2">
          <ul
            role="list"
            className="border border-slate-6 rounded-md divide-y divide-slate-6"
          >
            <DocumentItem
              fullname="Tatenda Chinyamakobvu"
              email_address="tatendachris@gmail.com"
              onUpdate={() => setActiveModal("document_upload")}
              onRemove={() => {}}
            />
            <DocumentItem
              fullname="Sean Muchenje"
              email_address="seanmuchie@gmail.com"
              updatedDate="22 Mar, 2025"
              onUpdate={() => setActiveModal("document_upload")}
              onRemove={() => {}}
            />
          </ul>
        </dd>
      </div>
    </DashboardProfileLayout>
  );
}
