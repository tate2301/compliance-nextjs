// @ts-nocheck

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeftIcon,
  EyeIcon,
  ListIcon,
  SaveIcon,
  SettingsIcon,
} from "lucide-react";
import React, { useCallback, useState } from "react";
import { useFormContext } from "../context";
import type { Form } from "../types";
import { FieldList } from "./FieldList";
import { FieldProperties } from "./FieldProperties";
import { FormPreview } from "./FormPreview";
import { FormSettings } from "./FormSettings";
import { FullscreenPreviewModal } from "./FullscreenPreviewModal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface FormBuilderProps {
  formName: string;
  formDescription: string;
  initialForm?: Form;
  onSubmitForm: (form: Form) => void;
}

export function FormBuilderPresenter({
  formName,
  formDescription,
  onSubmitForm,
}: FormBuilderProps) {
  const { form, updateForm, selectedFieldId, exportForm } = useFormContext();
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [activeTab, setActiveTab] = React.useState<"fields" | "settings">(
    "fields"
  );

  // Initialize form with provided name and description only once on mount
  React.useEffect(() => {
    if (!form.title && !form.description) {
      updateForm({
        title: formName,
        description: formDescription,
      });
    }
  }, []);

  const handlePreviewClick = () => {
    setIsPreviewModalOpen(true);
  };

  const handlePublish = useCallback(() => {
    onSubmitForm(form);
  }, [form]);

  return (
    <div className="flex h-screen flex-col bg-sand-50">
      {/* Top Toolbar */}
      <header className="border-b bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-sand-900">
                {form.title || "Untitled Form"}
              </h1>
              <p className="text-sm text-sand-500">
                Build and customize your form
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handlePreviewClick}>
              <EyeIcon className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button size="sm" onClick={handlePublish}>
              <SaveIcon className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Field Types */}
        <aside className="w-72 border-r bg-white">
          <Tabs defaultValue="fields" className="h-full">
            <TabsList className="flex w-full justify-start gap-2 border-b bg-white px-4 py-2">
              <TabsTrigger
                value="fields"
                className="flex items-center gap-2"
                onClick={() => setActiveTab("fields")}
              >
                <ListIcon className="h-4 w-4" />
                Fields
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="flex items-center gap-2"
                onClick={() => setActiveTab("settings")}
              >
                <SettingsIcon className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
            <div className="h-full overflow-y-auto">
              <TabsContent value="fields" className="m-0 h-full">
                <FieldList />
              </TabsContent>
              <TabsContent value="settings" className="m-0 h-full">
                <FormSettings />
              </TabsContent>
            </div>
          </Tabs>
        </aside>

        {/* Center - Form Preview */}
        <main className="flex-1 overflow-y-auto bg-sand-50 p-8">
          <div className="mx-auto max-w-3xl">
            <FormPreview onHandleSubmitForm={handlePublish} />
          </div>
        </main>

        {/* Right Sidebar - Field Properties */}
        <aside className="w-72 border-l bg-white">
          {selectedFieldId ? (
            <div className="h-full overflow-y-auto p-6">
              <FieldProperties />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center p-6 text-center text-sand-500">
              <div>
                <p className="text-sm">
                  Select a field to customize its properties
                </p>
              </div>
            </div>
          )}
        </aside>
      </div>

      <FullscreenPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        form={form}
      />
    </div>
  );
}

export function FormBuilder(props: FormBuilderProps) {
  return <FormBuilderPresenter {...props} />;
}
