import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DocumentReference } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DocumentFormProps {
  documentReferences?: DocumentReference[];
  onSubmit: (payload: any) => void;
}

export function DocumentForm({
  documentReferences,
  onSubmit,
}: DocumentFormProps) {
  const [formData, setFormData] = useState({
    document_id: "",
    certificate: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        certificate: e.target.files![0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("Document_id", formData.document_id);

    if (formData.certificate) {
      formPayload.append("certificate", formData.certificate);
    }

    onSubmit(formPayload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="document_type">Document Type</Label>
        <Select
          value={formData.document_id}
          onValueChange={(value) => {
            setFormData((prev) => ({
              ...prev,
              document_id: value,
            }));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select document type" />
          </SelectTrigger>
          <SelectContent>
            {documentReferences?.map((ref) => (
              <SelectItem key={ref.id} value={ref.id.toString()}>
                {ref.name} {ref.is_required && "(Required)"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="certificate">Document File</Label>
        <Input
          id="certificate"
          name="certificate"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          required
        />
      </div>
    </form>
  );
}