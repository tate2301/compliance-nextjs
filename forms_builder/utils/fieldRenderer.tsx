import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import type { FormField } from "../types";

const commonLabelStyles = {
	color: "var(--text)",
	fontWeight: "500",
} as const;

const commonInputStyles = {
	backgroundColor: "var(--surface)",
	color: "var(--text)",
} as const;

const commonButtonStyles = {
	backgroundColor: "var(--surface)",
	color: "var(--text)",
} as const;

const commonButtonHoverStyles = {
	backgroundColor: "var(--primary)",
	color: "white",
} as const;

export function renderField(field: FormField) {
	const { id, label, required, type, properties } = field;

	const commonProps = {
		id,
		required,
		placeholder: properties.placeholder || `Enter ${label.toLowerCase()}`,
		style: commonInputStyles,
		className: "",
	};

	const renderRequiredIndicator = () => (
		<span className="ml-1 text-error-10">*</span>
	);

	switch (type) {
		case "shortAnswer":
			return (
				<div className="space-y-2">
					<Label style={commonLabelStyles} htmlFor={id} className="text-zinc-700">
						{label}
						{required && renderRequiredIndicator()}
					</Label>
					<Input
						type="text"
						{...commonProps}
						minLength={properties.minLength}
						maxLength={properties.maxLength}
					/>
				</div>
			);
		case "longAnswer":
			return (
				<div className="space-y-2">
					<Label style={commonLabelStyles} htmlFor={id} className="text-zinc-700">
						{label}
						{required && renderRequiredIndicator()}
					</Label>
					<Textarea
						{...commonProps}
						minLength={properties.minLength}
						maxLength={properties.maxLength}
					/>
				</div>
			);
		case "email":
			return (
				<div className="space-y-2">
					<Label style={commonLabelStyles} htmlFor={id} className="text-zinc-700">
						{label}
						{required && renderRequiredIndicator()}
					</Label>
					<Input type="email" {...commonProps} />
				</div>
			);
		case "date":
			return (
				<div className="space-y-2">
					<Label style={commonLabelStyles} htmlFor={id} className="text-zinc-700">
						{label}
						{required && renderRequiredIndicator()}
					</Label>
					<DatePicker
						onChange={(_value) => { }}
						value={new Date()}
						{...commonProps}
					/>
				</div>
			);
		case "multipleChoice":
			return (
				<div className="space-y-3">
					<Label style={commonLabelStyles} className="text-zinc-700">
						{label}
						{required && renderRequiredIndicator()}
					</Label>
					<RadioGroup className="space-y-2">
						{properties.choices?.map((choice, index) => (
							<div key={index} className="flex items-center space-x-2">
								<RadioGroupItem
									value={choice}
									id={`${id}-${index}`}
									className="border-zinc-300 text-indigo-600 focus:ring-indigo-500/20"
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
					<Label style={commonLabelStyles} className="text-zinc-700">
						{label}
						{required && renderRequiredIndicator()}
					</Label>
					<RadioGroup className="space-y-2">
						<div className="flex items-center space-x-2">
							<RadioGroupItem
								value="yes"
								id={`${id}-yes`}
								className="border-zinc-300 text-indigo-600 focus:ring-indigo-500/20"
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
								className="border-zinc-300 text-indigo-600 focus:ring-indigo-500/20"
							/>
							<Label
								htmlFor={`${id}-no`}
								className="text-zinc-600 font-normal"
							>
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
					<Label style={commonLabelStyles} htmlFor={id} className="text-zinc-700">
						{label}
						{required && renderRequiredIndicator()}
					</Label>
					<div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
						{Array.from({ length: maxRating }, (_, i) => i + 1).map((value) => (
							<button
								key={value}
								type="button"
								aria-checked="false"
								aria-label={`Rating ${value}`}
								className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white font-medium text-zinc-700 transition-colors hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
							>
								{value}
							</button>
						))}
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
					<Label style={commonLabelStyles} htmlFor={id} className="text-zinc-700">
						{label}
						{required && renderRequiredIndicator()}
					</Label>
					<div className="flex flex-wrap gap-2">
						{Array.from({ length: maxRatingScale }, (_, i) => i + 1).map(
							(value) => (
								<button
									key={value}
									type="button"
									className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white font-medium text-zinc-700 transition-colors hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
								>
									{value}
								</button>
							),
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
				<div className="space-y-2">
					<Label style={commonLabelStyles} htmlFor={id} className="text-zinc-700">
						{label}
						{required && renderRequiredIndicator()}
					</Label>
					<div className="rounded-lg border-2 border-dashed border-zinc-200 bg-zinc-50/50 p-6 text-center transition-colors hover:border-indigo-300 hover:bg-zinc-50">
						<Input
							type="file"
							{...commonProps}
							accept={properties.allowedFileTypes?.join(",")}
							className="hidden"
						/>
						<div className="flex flex-col items-center justify-center gap-2">
							<div className="rounded-full bg-indigo-50 p-2 text-indigo-600">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
									<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
									<polyline points="17 8 12 3 7 8"></polyline>
									<line x1="12" y1="3" x2="12" y2="15"></line>
								</svg>
							</div>
							<div>
								<p className="text-sm font-medium text-zinc-700">
									Click to upload or drag and drop
								</p>
								<p className="text-xs text-zinc-500">
									{properties.allowedFileTypes?.join(", ") || "All files"} {properties.maxFileSize && `(Max: ${properties.maxFileSize}MB)`}
								</p>
							</div>
						</div>
					</div>
				</div>
			);
		default:
			return <div>Unsupported field type: {type}</div>;
	}
}
