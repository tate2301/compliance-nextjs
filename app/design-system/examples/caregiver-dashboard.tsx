'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CalendarDays, Upload, Clock, CheckCircle, AlertCircle } from 'lucide-react'

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

export default function CaregiverDashboardExamples() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-12">Caregiver Dashboard Examples</h2>
                <p className="text-slate-11">Practical examples of the design system in action, showcasing common caregiver dashboard patterns.</p>
            </div>

            <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-12 mb-4">Example Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <h4 className="font-medium text-slate-12">Layout Examples</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/examples/constrained_grid_layout" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Constrained Grid Layout
                                </a>
                            </li>
                            <li>
                                <a href="/examples/stacked_card_layout" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Stacked Card Layout
                                </a>
                            </li>
                            <li>
                                <a href="/examples/split_screen" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Split Screen
                                </a>
                            </li>
                            <li>
                                <a href="/examples/multi_column_directory" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Multi-Column Directory
                                </a>
                            </li>
                            <li>
                                <a href="/examples/full_width_three_column" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Full Width Three Column
                                </a>
                            </li>
                            <li>
                                <a href="/examples/double" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Double Layout
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-medium text-slate-12">Content Examples</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/examples/with_condensed_content" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Condensed Content Table
                                </a>
                            </li>
                            <li>
                                <a href="/examples/with_multiple_item_types" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Multiple Item Types
                                </a>
                            </li>
                            <li>
                                <a href="/examples/with_groups" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Grouped Content
                                </a>
                            </li>
                            <li>
                                <a href="/examples/with_page_heading_and_stacked_list" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Page Heading with Stacked List
                                </a>
                            </li>
                            <li>
                                <a href="/examples/with_sticky_headings" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Sticky Headings
                                </a>
                            </li>
                            <li>
                                <a href="/examples/bullets_and_text" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Bullets and Text
                                </a>
                            </li>
                            <li>
                                <a href="/examples/simple" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Simple Content
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-medium text-slate-12">Navigation Examples</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/examples/with_actions_and_breadcrumbs" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Actions with Breadcrumbs
                                </a>
                            </li>
                            <li>
                                <a href="/examples/with_actions_and_tabs" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Actions with Tabs
                                </a>
                            </li>
                            <li>
                                <a href="/examples/tabs_with_underline_and_badges" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Tabs with Underline and Badges
                                </a>
                            </li>
                            <li>
                                <a href="/examples/simple_with_icons" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Simple with Icons
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-medium text-slate-12">Form Examples</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/examples/with_title_and_pill_actions" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Title with Pill Actions
                                </a>
                            </li>
                            <li>
                                <a href="/examples/with_left_label_and_description" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Left Label with Description
                                </a>
                            </li>
                            <li>
                                <a href="/examples/with_well" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Form with Well
                                </a>
                            </li>
                            <li>
                                <a href="/examples/list_with_checkbox_on_right" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    List with Checkbox on Right
                                </a>
                            </li>
                            <li>
                                <a href="/examples/list_with_radio_on_right" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    List with Radio on Right
                                </a>
                            </li>
                            <li>
                                <a href="/examples/secondary_buttons" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Secondary Buttons
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-medium text-slate-12">Interactive Examples</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/examples/with_preview" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Preview Component
                                </a>
                            </li>
                            <li>
                                <a href="/examples/with_dropdown" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Dropdown Menu
                                </a>
                            </li>
                            <li>
                                <a href="/examples/with_imageurl" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Image URL Component
                                </a>
                            </li>
                            <li>
                                <a href="/examples/with_avatar_and_actions" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Avatar with Actions
                                </a>
                            </li>
                            <li>
                                <a href="/examples/narrow_with_avatar_group" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Narrow with Avatar Group
                                </a>
                            </li>
                            <li>
                                <a href="/examples/actions_with_shared_borders" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Actions with Shared Borders
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-medium text-slate-12">Dashboard Examples</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/examples/DashboardExample" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Main Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="/examples/small_with_meetings" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Small with Meetings
                                </a>
                            </li>
                            <li>
                                <a href="/examples/left_aligned_with_inline_actions" className="text-primary-11 hover:text-primary-12 transition-colors">
                                    Left Aligned with Inline Actions
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Verification Status Card */}
                <ExampleCard title="Verification Status">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-slate-12">Background Check</p>
                                <Progress value={100} className="bg-slate-3" />
                            </div>
                            <Badge variant="secondary">Complete</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-slate-12">Document Verification</p>
                                <Progress value={60} className="bg-slate-3" />
                            </div>
                            <Badge variant="outline">In Progress</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-slate-12">Reference Check</p>
                                <Progress value={0} className="bg-slate-3" />
                            </div>
                            <Badge variant="secondary">Pending</Badge>
                        </div>
                    </div>
                </ExampleCard>

                {/* Document Upload Card */}
                <ExampleCard title="Required Documents">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-slate-2 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-success-9" />
                                <span className="text-sm text-slate-12">ID Verification</span>
                            </div>
                            <Badge variant="outline">Uploaded</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-2 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <AlertCircle className="w-5 h-5 text-warning-9" />
                                <span className="text-sm text-slate-12">Certification</span>
                            </div>
                            <Button size="sm" variant="outline">
                                <Upload className="w-4 h-4 mr-2" />
                                Upload
                            </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-2 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <AlertCircle className="w-5 h-5 text-error-9" />
                                <span className="text-sm text-slate-12">Insurance</span>
                            </div>
                            <Button size="sm" variant="outline">
                                <Upload className="w-4 h-4 mr-2" />
                                Upload
                            </Button>
                        </div>
                    </div>
                </ExampleCard>

                {/* Upcoming Shifts Card */}
                <ExampleCard title="Upcoming Shifts">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-3 bg-slate-2 rounded-lg">
                            <CalendarDays className="w-10 h-10 text-primary-9" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-12">Morning Shift</p>
                                <p className="text-xs text-slate-11">Today, 7:00 AM - 3:00 PM</p>
                                <div className="flex items-center mt-2">
                                    <Avatar className="w-6 h-6">
                                        <img src="https://ui.shadcn.com/avatars/01.png" alt="Patient" />
                                    </Avatar>
                                    <span className="ml-2 text-xs text-slate-11">Sarah Johnson</span>
                                </div>
                            </div>
                            <Badge>Confirmed</Badge>
                        </div>
                        <div className="flex items-center space-x-4 p-3 bg-slate-2 rounded-lg">
                            <CalendarDays className="w-10 h-10 text-primary-9" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-12">Evening Shift</p>
                                <p className="text-xs text-slate-11">Tomorrow, 3:00 PM - 11:00 PM</p>
                                <div className="flex items-center mt-2">
                                    <Avatar className="w-6 h-6">
                                        <img src="https://ui.shadcn.com/avatars/02.png" alt="Patient" />
                                    </Avatar>
                                    <span className="ml-2 text-xs text-slate-11">Michael Brown</span>
                                </div>
                            </div>
                            <Badge variant="outline">Pending</Badge>
                        </div>
                    </div>
                </ExampleCard>

                {/* Availability Calendar */}
                <ExampleCard title="Set Availability">
                    <div className="space-y-4">
                        <Calendar
                            mode="multiple"
                            className="rounded-md border"
                        />
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-11">Selected: 5 days</p>
                            <Button size="sm">Update Schedule</Button>
                        </div>
                    </div>
                </ExampleCard>

                {/* Quick Actions */}
                <ExampleCard title="Quick Actions">
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
                            <Clock className="w-6 h-6" />
                            <span className="text-sm">Clock In</span>
                        </Button>
                        <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
                            <Upload className="w-6 h-6" />
                            <span className="text-sm">Submit Report</span>
                        </Button>
                        <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
                            <CalendarDays className="w-6 h-6" />
                            <span className="text-sm">Request Time Off</span>
                        </Button>
                        <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
                            <AlertCircle className="w-6 h-6" />
                            <span className="text-sm">Report Issue</span>
                        </Button>
                    </div>
                </ExampleCard>

                {/* Patient Notes */}
                <ExampleCard title="Patient Notes">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="notes">Care Notes</Label>
                            <Input
                                id="notes"
                                placeholder="Enter patient care notes..."
                                className="h-20"
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button variant="outline">Save Draft</Button>
                            <Button>Submit Notes</Button>
                        </div>
                    </div>
                </ExampleCard>
            </div>
        </div>
    )
} 