"use client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
	value?: Date | null;
	onChange: (date: Date | undefined) => void;
	className?: string;
	disabled?: boolean;
}

export function DatePicker({
	value,
	onChange,
	className,
	disabled = false,
}: DatePickerProps) {
	return (
		<div className="relative">
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							"w-full justify-start text-slate-11 text-left font-normal border-slate-6",
							!value && "text-slate-10",
							className
						)}
						disabled={disabled}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{value ? format(value, "PPP") : <span>Pick a date</span>}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className={cn(
						"w-auto p-0",
						"bg-slate-1 border border-slate-6",
						"shadow-lg rounded-md"
					)}
					align="start"
				>
					<Calendar
						mode="single"
						selected={value || undefined}
						onSelect={onChange}
						initialFocus
						disabled={disabled}
						className="rounded-md border-0"
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
