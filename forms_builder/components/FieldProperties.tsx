import { Button } from "@/components/ui/button";
import { Input as TextField } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { PlusIcon, TrashIcon } from "lucide-react";
import type { KeyboardEvent } from "react";
import { useFormContext } from "../context";
import type { FormField, InputType } from "../types";

const fieldTypes = [
	{ value: "shortAnswer", label: "Short Answer" },
	{ value: "longAnswer", label: "Long Answer" },
	{ value: "email", label: "Email" },
	{ value: "date", label: "Date" },
	{ value: "multipleChoice", label: "Multiple Choice" },
	{ value: "yesNo", label: "Yes/No" },
	{ value: "npsRating", label: "NPS Rating" },
	{ value: "fileUpload", label: "File Upload" },
	{ value: "likertScale", label: "Likert Scale" },
];

export function FieldProperties() {
	const { form, updateField, selectedFieldId } = useFormContext();
	const selectedField = form.fields?.find(
		(field) => field.id === selectedFieldId,
	);

	if (!selectedField) {
		return null;
	}

	const handleChange = (key: keyof FormField, value: any) => {
		updateField(selectedField.id, { [key]: value });
	};

	const handlePropertyChange = (key: string, value: any) => {
		// Validate numeric inputs
		if (typeof value === "number" && Number.isNaN(value)) {
			return;
		}

		// Ensure choices array is never empty for multiple choice
		if (key === "choices" && Array.isArray(value) && value.length === 0) {
			value = ["Option 1"];
		}

		updateField(selectedField.id, {
			properties: { ...selectedField.properties, [key]: value },
		});
	};

	const handleTypeChange = (newType: InputType) => {
		updateField(selectedField.id, {
			type: newType,
			properties: {}, // Reset properties when changing type
		});
	};

	const handleChoiceKeyDown = (
		event: KeyboardEvent<HTMLInputElement>,
		_index: number,
	) => {
		if (event.key === "Enter") {
			event.preventDefault();
			const newChoices = [...(selectedField.properties.choices || []), ""];
			handlePropertyChange("choices", newChoices);
		}
	};

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-sm font-medium text-zinc-500">FIELD PROPERTIES</h3>
				<p className="text-xs text-zinc-400">Customize the selected field</p>
			</div>

			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="fieldType" className="text-zinc-500">Field Type</Label>
					<Select
						value={selectedField.type}
						onValueChange={(value) => handleTypeChange(value as InputType)}
					>
						<SelectTrigger className="w-full bg-white">
							<SelectValue placeholder="Select field type" />
						</SelectTrigger>
						<SelectContent className="bg-white">
							{fieldTypes.map((type) => (
								<SelectItem key={type.value} value={type.value}>
									{type.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label htmlFor="fieldLabel" className="text-zinc-500">Label</Label>
					<TextField
						id="fieldLabel"
						value={selectedField.label}
						onChange={(e) => handleChange("label", e.target.value)}
						className="w-full"
					/>
				</div>

				<div className="flex items-center justify-between rounded-lg border bg-white p-3">
					<div className="space-y-0.5">
						<Label htmlFor="required" className="text-zinc-700">Required field</Label>
						<p className="text-xs text-zinc-500">Make this field mandatory</p>
					</div>
					<Switch
						id="required"
						checked={selectedField.required}
						onCheckedChange={(checked) => handleChange("required", checked)}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="placeholder" className="text-zinc-500">Placeholder</Label>
					<TextField
						id="placeholder"
						value={selectedField.properties.placeholder || ""}
						onChange={(e) => handlePropertyChange("placeholder", e.target.value)}
						className="w-full"
					/>
				</div>

				{/* Type-specific properties */}
				{(selectedField.type === "shortAnswer" ||
					selectedField.type === "longAnswer") && (
						<div className="space-y-4 rounded-lg border bg-white p-4">
							<h4 className="font-medium text-zinc-700">Length Constraints</h4>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="minLength" className="text-zinc-500">Min Length</Label>
									<TextField
										id="minLength"
										type="number"
										value={selectedField.properties.minLength || ""}
										onChange={(e) =>
											handlePropertyChange(
												"minLength",
												Number.parseInt(e.target.value),
											)
										}
										className="w-full"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="maxLength" className="text-zinc-500">Max Length</Label>
									<TextField
										id="maxLength"
										type="number"
										value={selectedField.properties.maxLength || ""}
										onChange={(e) =>
											handlePropertyChange(
												"maxLength",
												Number.parseInt(e.target.value),
											)
										}
										className="w-full"
									/>
								</div>
							</div>
						</div>
					)}

				{selectedField.type === "multipleChoice" && (
					<div className="space-y-4 rounded-lg border bg-white p-4">
						<div className="flex items-center justify-between">
							<h4 className="font-medium text-zinc-700">Choices</h4>
							<Button
								size="sm"
								variant="outline"
								onClick={() => {
									const newChoices = [
										...(selectedField.properties.choices || []),
										"",
									];
									handlePropertyChange("choices", newChoices);
								}}
							>
								<PlusIcon className="mr-1 h-4 w-4" />
								Add Choice
							</Button>
						</div>
						<div className="space-y-2">
							{selectedField.properties.choices?.map((choice, index) => (
								<div key={index} className="flex items-center gap-2">
									<TextField
										value={choice}
										onChange={(e) => {
											const newChoices = [
												...(selectedField.properties.choices || []),
											];
											newChoices[index] = e.target.value;
											handlePropertyChange("choices", newChoices);
										}}
										onKeyDown={(e) => handleChoiceKeyDown(e, index)}
										className="w-full"
									/>
									<Button
										size="icon"
										variant="ghost"
										onClick={() => {
											const newChoices = selectedField.properties.choices?.filter(
												(_, i) => i !== index,
											);
											handlePropertyChange("choices", newChoices);
										}}
									>
										<TrashIcon className="h-4 w-4 text-zinc-400 hover:text-red-500" />
									</Button>
								</div>
							))}
						</div>
					</div>
				)}

				{selectedField.type === "npsRating" && (
					<div className="space-y-2">
						<Label htmlFor="npsMaxRating" className="text-zinc-500">Max Rating (NPS)</Label>
						<TextField
							id="npsMaxRating"
							type="number"
							value={selectedField.properties.npsMaxRating || 10}
							onChange={(e) =>
								handlePropertyChange(
									"npsMaxRating",
									Number.parseInt(e.target.value),
								)
							}
							className="w-full"
						/>
					</div>
				)}

				{selectedField.type === "fileUpload" && (
					<div className="space-y-4 rounded-lg border bg-white p-4">
						<h4 className="font-medium text-zinc-700">File Upload Settings</h4>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="allowedFileTypes" className="text-zinc-500">Allowed File Types</Label>
								<TextField
									id="allowedFileTypes"
									value={selectedField.properties.allowedFileTypes?.join(",") || ""}
									onChange={(e) =>
										handlePropertyChange(
											"allowedFileTypes",
											e.target.value.split(","),
										)
									}
									placeholder="e.g., .pdf,.doc,.docx"
									className="w-full"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="maxFileSize" className="text-zinc-500">Max File Size (MB)</Label>
								<TextField
									id="maxFileSize"
									type="number"
									value={selectedField.properties.maxFileSize || ""}
									onChange={(e) =>
										handlePropertyChange(
											"maxFileSize",
											Number.parseInt(e.target.value),
										)
									}
									className="w-full"
								/>
							</div>
						</div>
					</div>
				)}

				{selectedField.type === "likertScale" && (
					<div className="space-y-2">
						<Label htmlFor="likertScalePoints" className="text-zinc-500">Number of Scale Points</Label>
						<TextField
							id="likertScalePoints"
							type="number"
							value={selectedField.properties.scalePoints || 5}
							onChange={(e) =>
								handlePropertyChange(
									"scalePoints",
									Number.parseInt(e.target.value),
								)
							}
							className="w-full"
						/>
					</div>
				)}
			</div>
		</div>
	);
}
