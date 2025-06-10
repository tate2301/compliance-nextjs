import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reference } from "@/lib/types";

interface ReferenceFormProps {
  reference?: Reference;
  onSubmit: (reference: Reference) => void;
}

export function ReferenceForm({ reference, onSubmit }: ReferenceFormProps) {
  const [formData, setFormData] = useState<Partial<Reference>>(
    reference || {
      name: "",
      surname: "",
      email: "",
      phone: "",
      title: "",
      company: "",
      capacity_known: "",
      date_known_from: "",
      date_known_to: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Reference);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">First Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="surname">Last Name</Label>
          <Input
            id="surname"
            name="surname"
            value={formData.surname || ""}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title/Position</Label>
          <Input
            id="title"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            value={formData.company || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="capacity_known">Relationship</Label>
        <Input
          id="capacity_known"
          name="capacity_known"
          value={formData.capacity_known || ""}
          onChange={handleChange}
          placeholder="e.g. Manager, Colleague, etc."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date_known_from">Known From</Label>
          <Input
            id="date_known_from"
            name="date_known_from"
            type="date"
            value={formData.date_known_from || ""}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date_known_to">Known To</Label>
          <Input
            id="date_known_to"
            name="date_known_to"
            type="date"
            value={formData.date_known_to || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
}