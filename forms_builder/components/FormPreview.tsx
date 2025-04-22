import { Button } from "@/components/ui/button";
import { useFormContext } from "../context";
import { renderField } from "../utils/fieldRenderer";
import { ensureCompleteTheme, getCssVariables } from "../utils/themeUtils";
import { Form } from "../types";

export function FormPreview({
  onHandleSubmitForm,
}: {
  onHandleSubmitForm: () => void;
}) {
  const { form } = useFormContext();
  const safeTheme = ensureCompleteTheme(form.theme);

  return (
    <div className="relative">
      <div
        className="p-3"
        style={{
          ...getCssVariables(safeTheme),
          backgroundColor: "var(--background)",
          fontFamily: "'Sohne', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          color: "var(--text)",
        }}
      >
        <div className="space-y-8">
          <div className="space-y-4 border-b pb-6">
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
          <div className="space-y-8">
            {form.fields.map((field, index) => (
              <div
                key={field.id}
                className="rounded-lg bg-zinc-50/50 p-6 transition-all hover:bg-zinc-50"
              >
                {renderField(field)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
