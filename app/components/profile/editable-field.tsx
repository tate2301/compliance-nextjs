import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useState } from "react";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface EditableFieldProps {
  label: string;
  value: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (value: string) => void;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  renderValue?: (value: string) => React.ReactNode;
  options?: Array<any>;
}

export function EditableField({
  label,
  value,
  isEditing,
  onEdit,
  onSave,
  onChange,
  placeholder,
  type = "text",
  renderValue,
  options = [],
}: EditableFieldProps) {
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (newValue: string) => {
    setCurrentValue(newValue);
    onChange(newValue);
  };

  const handleSave = () => {
    onSave(currentValue);
  };

  // Update local state when prop value changes
  if (value !== currentValue && !isEditing) {
    setCurrentValue(value);
  }

  return (
    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-medium text-slate-11">{label}</dt>
      <dd className="mt-1 flex text-sm text-slate-12 sm:mt-0 sm:col-span-2">
        {isEditing ? (
          type === "select" ? (
            <Select value={currentValue} onValueChange={handleChange}>
              <SelectTrigger className="flex-grow">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              className="flex-grow"
              type={type}
              value={currentValue}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={placeholder}
            />
          )
        ) : (
          <span className="flex-grow flex-1">
            {renderValue
              ? renderValue(value)
              : type === "select"
              ? options.find((opt) => opt.value === value)?.label || value
              : value}
          </span>
        )}
        <span className="ml-4 flex-shrink-0">
          <Button
            variant="outline"
            className="text-primary-11 hover:text-primary-12"
            onClick={() => (isEditing ? handleSave() : onEdit())}
          >
            {isEditing ? "Save" : "Update"}
          </Button>
        </span>
      </dd>
    </div>
  );
}
