"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ButtonExamples from "./buttons";
import FormExamples from "./form-elements";
import FileUploadExamples from "./file-upload";
import ModalExamples from "./modals";
import LayoutExamples from "./layouts";

const sections = [
  { id: "buttons", title: "Buttons", component: ButtonExamples },
  { id: "forms", title: "Form Elements", component: FormExamples },
  { id: "file-upload", title: "File Upload", component: FileUploadExamples },
  { id: "modals", title: "Modals", component: ModalExamples },
  { id: "layouts", title: "Page Layouts", component: LayoutExamples },
];

export default function AdminDashboardExamples() {
  const [activeSection, setActiveSection] = useState("buttons");

  return (
    <div className="relative">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-sand-12">
            Admin Dashboard
          </h1>
          <p className="text-lg text-sand-11">
            UI patterns and components for building administrative interfaces
          </p>
        </div>
      </div>

      <div className="flex flex-col space-y-8">
        {/* Navigation */}
        <div className="sticky top-0 z-30 -mx-6 bg-sand-1/95 px-6 py-4 backdrop-blur">
          <Separator className="mt-4 bg-sand-6" />
        </div>

        {/* Content */}
        <div className="relative">
          {sections.map(
            ({ id, component: Component }) =>
              activeSection === id && <Component key={id} />
          )}
        </div>
      </div>
    </div>
  );
}
