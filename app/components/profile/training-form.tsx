import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Training } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TrainingFormProps {
  training?: Training;
  trainingReferences?: any[];
  onSubmit: (training: FormData) => void;
}

export function TrainingForm({
  training,
  trainingReferences,
  onSubmit,
}: TrainingFormProps) {
  const [formData, setFormData] = useState({
    training_id: training?.training_id?.toString() || "",
    date_trained: training?.date_trained || "",
    date_expiring: training?.date_expiring || "",
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

    const payload = new FormData();
    payload.append("date_trained", formData.date_trained);
    payload.append("date_expiring", formData.date_expiring);

    // Handle single or multiple training IDs
    if (formData.training_id.includes(",")) {
      const ids = formData.training_id.split(",").map((id) => parseInt(id));
      ids.forEach((id) => {
        payload.append("training_id[]", id.toString());
      });
    } else {
      payload.append("training_id[]", formData.training_id);
    }

    if (formData.certificate) {
      payload.append("certificate", formData.certificate);
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="training_type">Training Type</Label>
        <Select
          value={formData.training_id}
          onValueChange={(value) => {
            setFormData((prev) => ({
              ...prev,
              training_id: value,
            }));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select training type" />
          </SelectTrigger>
          <SelectContent>
            {trainingReferences?.map((ref) => (
              <SelectItem key={ref.id} value={ref.id.toString()}>
                {ref.name} {ref.is_required && "(Required)"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
        <div className="space-y-2 sm:w-full md:flex-1">
          <Label htmlFor="date_trained">Date Trained</Label>
          <Input
            id="date_trained"
            name="date_trained"
            type="date"
            value={formData.date_trained}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2 sm:w-full md:flex-1">
          <Label htmlFor="date_expiring">Expiry Date</Label>
          <Input
            id="date_expiring"
            name="date_expiring"
            type="date"
            value={formData.date_expiring}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="certificate">Certificate (Optional)</Label>
        <Input
          id="certificate"
          name="certificate"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
        />
      </div>
    </form>
  );
}
