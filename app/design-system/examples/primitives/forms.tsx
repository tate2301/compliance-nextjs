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

interface ExampleCardProps {
    title: string
    children: React.ReactNode
    className?: string
}

function ExampleCard({ title, children, className = '' }: ExampleCardProps) {
    return (
        <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-12">{title}</h3>
            <Card className={`p-4 ${className}`}>
                {children}
            </Card>
        </div>
    )
}

export default function FormExamples() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-12">Form Examples</h2>
                <p className="text-slate-11">Examples of form components following our design system guidelines.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Text Inputs */}
                <ExampleCard title="Text Inputs">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="default">Default Input</Label>
                            <Input id="default" placeholder="Enter your name" />
                            <code className="text-sm text-slate-11">Default input with label</code>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="disabled">Disabled Input</Label>
                            <Input id="disabled" placeholder="Disabled input" disabled />
                            <code className="text-sm text-slate-11">Disabled input state</code>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="error">Error Input</Label>
                            <Input id="error" placeholder="Invalid input" className="border-error-7" />
                            <p className="text-sm text-error-11">This field is required</p>
                            <code className="text-sm text-slate-11">Input with error state</code>
                        </div>
                    </div>
                </ExampleCard>

                {/* Select Inputs */}
                <ExampleCard title="Select Inputs">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Default Select</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="option1">Option 1</SelectItem>
                                    <SelectItem value="option2">Option 2</SelectItem>
                                    <SelectItem value="option3">Option 3</SelectItem>
                                </SelectContent>
                            </Select>
                            <code className="text-sm text-slate-11">Default select component</code>
                        </div>

                        <div className="space-y-2">
                            <Label>Disabled Select</Label>
                            <Select disabled>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select disabled" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="option1">Option 1</SelectItem>
                                </SelectContent>
                            </Select>
                            <code className="text-sm text-slate-11">Disabled select state</code>
                        </div>
                    </div>
                </ExampleCard>

                {/* Checkbox and Radio */}
                <ExampleCard title="Checkbox and Radio">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <Label>Checkboxes</Label>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms" />
                                    <label htmlFor="terms" className="text-sm text-slate-12">
                                        Accept terms and conditions
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="disabled" disabled checked />
                                    <label htmlFor="disabled" className="text-sm text-slate-11">
                                        Disabled checkbox
                                    </label>
                                </div>
                            </div>
                            <code className="text-sm text-slate-11">Checkbox components</code>
                        </div>

                        <div className="space-y-4">
                            <Label>Radio Group</Label>
                            <RadioGroup defaultValue="option1">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option1" id="option1" />
                                    <label htmlFor="option1" className="text-sm text-slate-12">
                                        Option 1
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option2" id="option2" />
                                    <label htmlFor="option2" className="text-sm text-slate-12">
                                        Option 2
                                    </label>
                                </div>
                            </RadioGroup>
                            <code className="text-sm text-slate-11">Radio group component</code>
                        </div>
                    </div>
                </ExampleCard>

                {/* Toggle and Textarea */}
                <ExampleCard title="Toggle and Textarea">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <Label>Switch</Label>
                            <div className="flex items-center space-x-2">
                                <Switch id="airplane-mode" />
                                <label htmlFor="airplane-mode" className="text-sm text-slate-12">
                                    Airplane Mode
                                </label>
                            </div>
                            <code className="text-sm text-slate-11">Switch component</code>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                placeholder="Type your message here."
                                className="min-h-[100px]"
                            />
                            <code className="text-sm text-slate-11">Textarea component</code>
                        </div>
                    </div>
                </ExampleCard>

                {/* Form Actions */}
                <ExampleCard title="Form Actions">
                    <div className="space-y-4">
                        <div className="flex space-x-2">
                            <Button variant="default">Submit</Button>
                            <Button variant="outline">Cancel</Button>
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="destructive">Delete</Button>
                            <Button variant="ghost">Reset</Button>
                        </div>
                        <div className="flex space-x-2">
                            <Button disabled>Disabled</Button>
                            <Button variant="outline" disabled>Disabled Outline</Button>
                        </div>
                        <code className="text-sm text-slate-11">Button variants</code>
                    </div>
                </ExampleCard>
            </div>
        </div>
    )
} 