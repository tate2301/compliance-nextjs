// @ts-nocheck

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Calendar,
  CheckCircle,
  GripVertical,
  Mail,
  Star,
  StarHalf,
  TextCursorInput,
  TextIcon,
  ToggleLeft,
  Trash2Icon,
  UploadCloud,
  Edit3,
  Type,
} from "lucide-react";
import { useFormContext } from "../context";
import type { FormField } from "../types";

const fieldTypes = [
  {
    type: "shortAnswer",
    label: "Short Answer",
    icon: <TextCursorInput />,
  },
  {
    type: "longAnswer",
    label: "Long Answer",
    icon: <TextIcon />,
  },
  { type: "email", label: "Email", icon: <Mail /> },
  { type: "date", label: "Date", icon: <Calendar /> },
  {
    type: "multipleChoice",
    label: "Multiple Choice",
    icon: <CheckCircle />,
  },
  {
    type: "yesNo",
    label: "Yes/No",
    icon: <ToggleLeft />,
  },
  {
    type: "npsRating",
    label: "NPS Rating",
    icon: <Star />,
  },
  {
    type: "likertScale",
    label: "Likert Scale",
    icon: <StarHalf />,
  },
  {
    type: "fileUpload",
    label: "File Upload",
    icon: <UploadCloud />,
  },
  {
    type: "signature",
    label: "Signature",
    icon: <Edit3 />,
  },
  {
    type: "paragraph",
    label: "Paragraph",
    icon: <Type />,
  },
];

export function FieldList() {
  const { form, addField, selectedFieldId, setSelectedFieldId, removeField } =
    useFormContext();

  const handleAddField = (type: FormField["type"]) => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      type,
      label: `${
        fieldTypes.find((fieldType) => fieldType.type === type)?.label
      }`,
      required: false,
      properties: {},
    };
    addField(newField);
    setSelectedFieldId(newField.id);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Field Types Section */}
      <div className="flex-none p-6">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-zinc-500">FIELD TYPES</h3>
          <p className="text-xs text-zinc-400">Click to add to your form</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {fieldTypes.map((fieldType) => (
            <button
              type="button"
              key={fieldType.type}
              onClick={() =>
                handleAddField(fieldType.type as FormField["type"])
              }
              className="group flex items-center gap-2 rounded-lg border border-zinc-200 bg-white p-3 text-left text-sm font-medium text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-sm"
            >
              <span className="rounded-md bg-zinc-100 p-2 text-zinc-500 transition-colors group-hover:bg-white group-hover:text-zinc-900">
                {fieldType.icon}
              </span>
              {fieldType.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Form Fields Section */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-zinc-500">FORM FIELDS</h3>
          <p className="text-xs text-zinc-400">Drag to reorder fields</p>
        </div>
        <div className="space-y-2">
          {form.fields?.map((field) => (
            <FieldListItem
              key={field.id}
              field={field}
              isSelected={field.id === selectedFieldId}
              onSelect={() => setSelectedFieldId(field.id)}
              onDelete={() => removeField(field.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const FieldListItem = ({
  field,
  isSelected,
  onSelect,
  onDelete,
}: {
  field: FormField;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this field?")) {
      onDelete();
    }
  };

  return (
    <div
      onClick={onSelect}
      className={cn(
        "group relative flex items-center gap-2 rounded-lg border bg-white p-3 transition-all hover:border-zinc-300 hover:shadow-sm",
        isSelected
          ? "border-indigo-500 bg-indigo-50/50 shadow-sm"
          : "border-zinc-200"
      )}
    >
      <button className="cursor-grab opacity-0 group-hover:opacity-100">
        <GripVertical className="h-4 w-4 text-zinc-400" />
      </button>
      <span className="flex items-center gap-2">
        {fieldTypes.find((type) => type.type === field.type)?.icon}
        <span className="text-sm font-medium text-zinc-700">{field.label}</span>
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="absolute right-2 ml-auto opacity-0 group-hover:opacity-100"
      >
        <Trash2Icon className="h-4 w-4 text-zinc-400 hover:text-red-500" />
      </Button>
    </div>
  );
};
