import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import type { FormField } from "../types";
import { SignatureInput } from "../components/Signature";
import { cn } from "@/lib/utils";

// Function to safely format text with basic Markdown-like syntax
function formatText(text: string): string {
  if (!text) return "";

  return (
    text
      // Escape HTML special characters
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      // Convert line breaks to <br>
      .replace(/\n/g, "<br>")
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Italic text
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      // Bullet points
      .replace(/^- (.*)$/gm, "• $1")
      // Links (only http/https)
      .replace(
        /(https?:\/\/[^\s<]+[^<.,:;"\')\]\s])/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>'
      )
  );
}

interface FieldRenderProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const commonLabelStyles = {
  fontWeight: "500",
} as const;

const commonInputStyles = {
  backgroundColor: "var(--surface)",
  color: "var(--text)",
} as const;

export function renderField(field: FormField, props: FieldRenderProps) {
  const { id, label, required, type, properties } = field;
  const { value, onChange, error } = props;

  const commonProps = {
    id,
    required,
    placeholder: properties.placeholder || `Enter ${label.toLowerCase()}`,
    style: commonInputStyles,
    className: cn(
      "w-full p-2",
      error && "border-error-7 focus:border-error-8 focus:ring-error-8"
    ),
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
  };

  const renderRequiredIndicator = () => (
    <span className="ml-1 text-error-10">*</span>
  );

  switch (type) {
    case "shortAnswer":
      return (
        <div className="space-y-2 p-2">
          <Label
            style={commonLabelStyles}
            htmlFor={id}
            className="text-slate-10"
          >
            {label}
            {required ? renderRequiredIndicator() : null}
          </Label>
          <Input
            type="text"
            {...commonProps}
            className="max-w-96"
            minLength={properties.minLength}
            maxLength={properties.maxLength}
          />
        </div>
      );
    case "longAnswer":
      return (
        <div className="space-y-2 p-2">
          <Label
            style={commonLabelStyles}
            htmlFor={id}
            className="text-slate-10"
          >
            {label}
            {required ? renderRequiredIndicator() : null}
          </Label>
          <Textarea
            {...commonProps}
            className="max-w-96"
            minLength={properties.minLength}
            maxLength={properties.maxLength}
          />
        </div>
      );
    case "email":
      return (
        <div className="space-y-2 p-2">
          <Label
            style={commonLabelStyles}
            htmlFor={id}
            className="text-slate-10"
          >
            {label}
            {required ? renderRequiredIndicator() : null}
          </Label>
          <div className="max-w-96">
            <Input type="email" {...commonProps} />
          </div>
        </div>
      );
    case "date":
      return (
        <div className="space-y-2 p-2">
          <Label
            style={commonLabelStyles}
            htmlFor={id}
            className="text-slate-10"
          >
            {label}
            {required ? renderRequiredIndicator() : null}
          </Label>
          <DatePicker
            value={value ? new Date(value) : null}
            onChange={(date) => onChange(date?.toISOString() ?? "")}
            className="w-full max-w-96"
          />
          {error && <p className="text-sm text-error-9 mt-1">{error}</p>}
        </div>
      );
    case "multipleChoice":
      return (
        <div className="space-y-3">
          <Label
            style={commonLabelStyles}
            className="text-slate-11 font-semibold"
          >
            {label}
            {required ? renderRequiredIndicator() : null}
          </Label>
          <RadioGroup
            value={value}
            onValueChange={onChange}
            className="space-y-2 p-2"
          >
            {properties.choices?.map((choice, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={choice}
                  id={`${id}-${index}`}
                  className={cn(
                    "border-zinc-300 text-primary-10 focus:ring-primary-20/20",
                    error && "border-error-7"
                  )}
                />
                <Label
                  htmlFor={`${id}-${index}`}
                  className="text-zinc-600 font-normal"
                >
                  {choice}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      );
    case "yesNo":
      return (
        <div className="space-y-3">
          <Label
            style={commonLabelStyles}
            className="text-slate-11 font-semibold"
          >
            {label}
            {required ? renderRequiredIndicator() : null}
          </Label>
          <RadioGroup
            value={value}
            onValueChange={onChange}
            className="space-y-2 p-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="yes"
                id={`${id}-yes`}
                className={cn(
                  "border-zinc-300 text-primary-10 focus:ring-primary-20/20",
                  error && "border-error-7"
                )}
              />
              <Label
                htmlFor={`${id}-yes`}
                className="text-zinc-600 font-normal"
              >
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="no"
                id={`${id}-no`}
                className={cn(
                  "border-zinc-300 text-primary-10 focus:ring-primary-20/20",
                  error && "border-error-7"
                )}
              />
              <Label htmlFor={`${id}-no`} className="text-zinc-600 font-normal">
                No
              </Label>
            </div>
          </RadioGroup>
        </div>
      );
    case "npsRating": {
      const maxRating = properties.npsMaxRating || 10;
      return (
        <div className="space-y-3">
          <Label
            style={commonLabelStyles}
            htmlFor={id}
            className="text-slate-10"
          >
            {label}
            {required ? renderRequiredIndicator() : null}
          </Label>
          <div
            role="radiogroup"
            aria-label={label}
            className="flex flex-wrap gap-2"
          >
            {Array.from({ length: maxRating }, (_, i) => i + 1).map(
              (rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => onChange(rating.toString())}
                  aria-checked={value === rating.toString()}
                  aria-label={`Rating ${rating}`}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border font-medium transition-colors focus:outline-none focus:ring-2",
                    value === rating.toString()
                      ? "border-primary-10 bg-primary-4 text-white"
                      : "border-zinc-200 bg-white text-slate-10 hover:border-primary-20 hover:bg-primary-2 hover:text-primary-10 focus:ring-primary-20/20",
                    error && "border-error-7"
                  )}
                >
                  {rating}
                </button>
              )
            )}
          </div>
          <div className="flex justify-between text-sm text-zinc-500">
            <span>Not at all likely</span>
            <span>Extremely likely</span>
          </div>
        </div>
      );
    }
    case "likertScale": {
      const maxRatingScale = properties.scalePoints || 5;
      return (
        <div className="space-y-3">
          <Label
            style={commonLabelStyles}
            htmlFor={id}
            className="text-slate-10"
          >
            {label}
            {required ? renderRequiredIndicator() : null}
          </Label>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: maxRatingScale }, (_, i) => i + 1).map(
              (rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => onChange(rating.toString())}
                  aria-checked={value === rating.toString()}
                  aria-label={`Rating ${rating}`}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border font-medium transition-colors focus:outline-none focus:ring-2",
                    value === rating.toString()
                      ? "border-primary-10 bg-primary-4 text-white"
                      : "border-zinc-200 bg-white text-slate-10 hover:border-primary-20 hover:bg-primary-2 hover:text-primary-10 focus:ring-primary-20/20",
                    error && "border-error-7"
                  )}
                >
                  {rating}
                </button>
              )
            )}
          </div>
          <div className="flex justify-between text-sm text-zinc-500">
            <span>Strongly disagree</span>
            <span>Strongly agree</span>
          </div>
        </div>
      );
    }
    case "fileUpload":
      return (
        <div className="space-y-2 p-2">
          <Label
            style={commonLabelStyles}
            htmlFor={id}
            className="text-slate-10"
          >
            {label}
            {required ? renderRequiredIndicator() : null}
          </Label>
          <div className="rounded-lg border-2 border-dashed flex-col max-w-96 bg-zinc-50/50 p-6 text-center transition-colors hover:border-indigo-300 hover:bg-zinc-50">
            <Input
              type="file"
              {...commonProps}
              accept={properties.allowedFileTypes?.join(",")}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center gap-2 max-w-96">
              <div className="rounded-full bg-primary-2 p-2 text-primary-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-10">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-zinc-500">
                  {properties.allowedFileTypes?.join(", ") || "All files"}{" "}
                  {properties.maxFileSize &&
                    `(Max: ${properties.maxFileSize}MB)`}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    case "signature":
      return (
        <div className="space-y-2 p-2">
          <Label
            style={commonLabelStyles}
            htmlFor={id}
            className="text-slate-10"
          >
            {label}
            {required ? renderRequiredIndicator() : null}
          </Label>
          <SignatureInput
            value={value}
            onEnd={onChange}
            width={properties.width || 600}
            height={properties.height || 200}
            required={required}
            className={cn(error && "border-error-7")}
          />
        </div>
      );
    case "paragraph":
      return (
        <div className="space-y-2 p-2">
          <div
            className={cn(
              "prose max-w-none w-full rounded-md p-4 leading-loose text-slate-11",
              properties.textAlign === "center" && "text-center",
              properties.textAlign === "right" && "text-right",
              properties.textAlign === "justify" && "text-justify"
            )}
            style={{
              fontSize: properties.fontSize
                ? `${properties.fontSize}px`
                : undefined,
              fontWeight: properties.fontWeight || undefined,
              color: properties.textColor || "var(--text)",
            }}
            dangerouslySetInnerHTML={{
              __html: properties.text || "",
            }}
          />
          {!properties.text && (
            <p className="text-zinc-400 italic text-sm">
              Enter paragraph text in the properties panel
            </p>
          )}
        </div>
      );
    default:
      return <></>
  }
}
