'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon, Check, ChevronsUpDown, HelpCircle } from 'lucide-react'
import { useState } from 'react'

interface ExampleCardProps {
    title: string
    children: React.ReactNode
    description?: string
    className?: string
}

function ExampleCard({ title, children, description, className = '' }: ExampleCardProps) {
    return (
        <div className="space-y-3">
            <div className="space-y-1">
                <h3 className="text-lg font-semibold text-sand-12">{title}</h3>
                {description && <p className="text-sm text-sand-11">{description}</p>}
            </div>
            <Card className={`p-4 border-sand-6 bg-sand-2 ${className}`}>
                {children}
            </Card>
        </div>
    )
}

export default function FormExamples() {
    const [date, setDate] = useState<Date>()

    return (
        <div className="space-y-10">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-sand-12">Form Elements</h2>
                <p className="text-sand-11">Examples of form components for admin dashboards and data entry interfaces.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Text Input Variations */}
                <ExampleCard
                    title="Text Inputs"
                    description="Various text input styles for different contexts"
                >
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="default-input">Standard Input</Label>
                            <Input
                                id="default-input"
                                placeholder="Enter name"
                                className="transition-all duration-300"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="disabled-input">Disabled Input</Label>
                            <Input
                                id="disabled-input"
                                placeholder="Unavailable field"
                                disabled
                                className="transition-all duration-300"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="error-input" className="text-red-11">Error Input</Label>
                            <Input
                                id="error-input"
                                placeholder="Invalid input"
                                className="border-red-7 focus-visible:ring-red-8 transition-all duration-300"
                            />
                            <p className="text-xs text-red-11">This field is required</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="with-icon" className="flex items-center gap-2">
                                With Help Icon
                                <HelpCircle className="h-3 w-3 text-sand-11" />
                            </Label>
                            <Input
                                id="with-icon"
                                placeholder="Enter value"
                                className="transition-all duration-300"
                            />
                            <p className="text-xs text-sand-11">Additional helper text to explain the input</p>
                        </div>
                    </div>
                </ExampleCard>

                {/* Selection Controls */}
                <ExampleCard
                    title="Selection Controls"
                    description="Various input types for selecting options"
                >
                    <div className="space-y-4">
                        {/* Dropdown Select */}
                        <div className="space-y-2">
                            <Label htmlFor="select">Dropdown Select</Label>
                            <Select>
                                <SelectTrigger id="select" className="transition-all duration-300">
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="option1">Option 1</SelectItem>
                                    <SelectItem value="option2">Option 2</SelectItem>
                                    <SelectItem value="option3">Option 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Date Picker */}
                        <div className="space-y-2">
                            <Label>Date Picker</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal transition-all duration-300"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Toggle Switches */}
                        <div className="space-y-2">
                            <Label htmlFor="notifications" className="text-sm font-medium">
                                Toggle Switches
                            </Label>
                            <div className="flex items-center space-x-2">
                                <Switch id="notifications" className="transition-all duration-300" />
                                <Label htmlFor="notifications" className="text-sm text-sand-11">
                                    Enable notifications
                                </Label>
                            </div>
                        </div>
                    </div>
                </ExampleCard>

                {/* Checkbox Group */}
                <ExampleCard
                    title="Checkbox Group"
                    description="Multiple selection controls"
                >
                    <div className="space-y-4">
                        <Label className="text-sm font-medium">User Permissions</Label>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="read" className="transition-all duration-300" />
                                <Label htmlFor="read" className="text-sm text-sand-12">
                                    Read
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="write" className="transition-all duration-300" />
                                <Label htmlFor="write" className="text-sm text-sand-12">
                                    Write
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="delete" className="transition-all duration-300" />
                                <Label htmlFor="delete" className="text-sm text-sand-12">
                                    Delete
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="admin" className="transition-all duration-300" disabled />
                                <Label htmlFor="admin" className="text-sm text-sand-11">
                                    Admin (Requires approval)
                                </Label>
                            </div>
                        </div>
                    </div>
                </ExampleCard>

                {/* Radio Group */}
                <ExampleCard
                    title="Radio Group"
                    description="Single selection from multiple options"
                >
                    <div className="space-y-4">
                        <Label className="text-sm font-medium">Account Type</Label>
                        <RadioGroup defaultValue="user" className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="user" id="user" className="transition-all duration-300" />
                                <Label htmlFor="user" className="text-sm text-sand-12">
                                    Regular User
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="admin" id="admin" className="transition-all duration-300" />
                                <Label htmlFor="admin" className="text-sm text-sand-12">
                                    Administrator
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="mod" id="mod" className="transition-all duration-300" />
                                <Label htmlFor="mod" className="text-sm text-sand-12">
                                    Moderator
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="guest" id="guest" className="transition-all duration-300" disabled />
                                <Label htmlFor="guest" className="text-sm text-sand-11">
                                    Guest (Unavailable)
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                </ExampleCard>

                {/* Text Area */}
                <ExampleCard
                    title="Text Area"
                    description="Multi-line text input for longer content"
                >
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter detailed description..."
                            className="min-h-[120px] transition-all duration-300"
                        />
                        <p className="text-xs text-sand-11">Supports markdown formatting</p>
                    </div>
                </ExampleCard>

                {/* Combobox */}
                <ExampleCard
                    title="Combobox"
                    description="Searchable dropdown with multiple options"
                >
                    <div className="space-y-2">
                        <Label htmlFor="combobox">Assigned To</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className="w-full justify-between transition-all duration-300"
                                >
                                    Select team member
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0" align="start">
                                <div className="p-2 space-y-1">
                                    <div className="flex items-center gap-2 rounded-sm p-1.5 cursor-pointer hover:bg-sand-3 transition-all duration-300">
                                        <Check className="h-4 w-4 text-primary-9" />
                                        <span>Sophia Chen</span>
                                    </div>
                                    <div className="flex items-center gap-2 rounded-sm p-1.5 cursor-pointer hover:bg-sand-3 transition-all duration-300">
                                        <div className="h-4 w-4" />
                                        <span>Marcus Johnson</span>
                                    </div>
                                    <div className="flex items-center gap-2 rounded-sm p-1.5 cursor-pointer hover:bg-sand-3 transition-all duration-300">
                                        <div className="h-4 w-4" />
                                        <span>Aisha Patel</span>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </ExampleCard>
            </div>

            {/* Form Layout */}
            <Separator className="my-8 bg-sand-6" />

            <ExampleCard
                title="Admin Form Layout"
                description="Complete form layout example"
            >
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="first-name">First Name</Label>
                            <Input id="first-name" placeholder="John" className="transition-all duration-300" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input id="last-name" placeholder="Doe" className="transition-all duration-300" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="johndoe@example.com" className="transition-all duration-300" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select>
                                <SelectTrigger id="role" className="transition-all duration-300">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Administrator</SelectItem>
                                    <SelectItem value="manager">Manager</SelectItem>
                                    <SelectItem value="user">Regular User</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            placeholder="Brief description..."
                            className="min-h-[100px] transition-all duration-300"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="active" className="transition-all duration-300" />
                        <Label htmlFor="active" className="text-sm text-sand-12">
                            Active account
                        </Label>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" className="transition-all duration-300">Cancel</Button>
                        <Button className="text-white transition-all duration-300">Save Changes</Button>
                    </div>
                </div>
            </ExampleCard>
        </div>
    )
} 