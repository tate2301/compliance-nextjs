// @ts-nocheck

import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import type { Form } from "../types";
import { renderField } from "../utils/fieldRenderer";
import { ensureCompleteTheme, getCssVariables } from "../utils/themeUtils";

interface FullscreenPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: Form;
}

export function FullscreenPreviewModal({
  isOpen,
  onClose,
  form,
}: FullscreenPreviewModalProps) {
  if (!isOpen) return null;

  const safeTheme = ensureCompleteTheme(form.theme);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-4xl animate-in fade-in zoom-in duration-200">
          <div
            className="relative rounded-xl border bg-white shadow-2xl"
            style={{
              ...getCssVariables(safeTheme),
              backgroundColor: "var(--background)",
              fontFamily: safeTheme.font,
              color: "var(--text)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <h2 className="text-xl font-semibold text-sand-900">
                  Form Preview
                </h2>
                <p className="text-sm text-sand-500">
                  Preview how your form will look to users
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full hover:bg-sand-100"
              >
                <XIcon className="h-5 w-5 text-sand-500" />
              </Button>
            </div>

            {/* Form Content */}
            <div className="max-h-screen overflow-y-auto p-6">
              <div className="mx-auto max-w-2xl space-y-8">
                <div className="space-y-4">
                  <h1
                    className="text-3xl font-bold tracking-tight"
                    style={{ color: "var(--primary)" }}
                  >
                    {form.title}
                  </h1>
                  {form.description && (
                    <p
                      className="text-lg"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {form.description}
                    </p>
                  )}
                </div>

                <div className="space-y-6">
                  {form.fields?.map((field) => (
                    <div
                      key={field.id}
                      className="rounded-lg bg-sand-50/50 p-6 transition-all hover:bg-sand-50"
                    >
                      {renderField(field)}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t bg-sand-50/80 px-6 py-4">
              <Button variant="outline" onClick={onClose}>
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
