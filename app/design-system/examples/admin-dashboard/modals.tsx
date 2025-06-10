'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, AlertTriangle, Check, HelpCircle, Info, Loader2, X } from 'lucide-react'
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

export default function ModalExamples() {
    const [isLoading, setIsLoading] = useState(false)

    const handleLoadingAction = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }

    return (
        <div className="space-y-10">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-sand-12">Modal Dialogs</h2>
                <p className="text-sand-11">Examples of modal dialogs and overlays for admin dashboard interfaces.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Confirmation Dialog */}
                <ExampleCard
                    title="Confirmation Dialog"
                    description="Modal for confirming user actions"
                >
                    <div className="space-y-6">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="destructive" className="transition-all duration-300">
                                    Delete Item
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] border-sand-6 bg-sand-2">
                                <DialogHeader>
                                    <DialogTitle className="text-sand-12">Confirm Deletion</DialogTitle>
                                    <DialogDescription className="text-sand-11">
                                        Are you sure you want to delete this item? This action cannot be undone.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex items-center gap-4 py-3">
                                    <div className="rounded-full bg-red-3 p-2">
                                        <AlertTriangle className="h-5 w-5 text-red-11" />
                                    </div>
                                    <p className="text-sm text-sand-12">This will permanently remove the item from your account.</p>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" className="transition-all duration-300">Cancel</Button>
                                    <Button variant="destructive" className="transition-all duration-300">Delete</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </ExampleCard>

                {/* Form Dialog */}
                <ExampleCard
                    title="Form Dialog"
                    description="Modal containing a form for data entry"
                >
                    <div className="space-y-6">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="transition-all duration-300">
                                    Edit Profile
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px] border-sand-6 bg-sand-2">
                                <DialogHeader>
                                    <DialogTitle className="text-sand-12">Edit Profile</DialogTitle>
                                    <DialogDescription className="text-sand-11">
                                        Make changes to your profile information below.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            defaultValue="John Doe"
                                            className="col-span-3 transition-all duration-300"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            defaultValue="john.doe@example.com"
                                            className="col-span-3 transition-all duration-300"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" className="text-white transition-all duration-300">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </ExampleCard>

                {/* Alert Dialog */}
                <ExampleCard
                    title="Alert Dialog"
                    description="Modals for displaying important information"
                >
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Alert className="border-amber-7 bg-amber-3 text-amber-11">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Warning</AlertTitle>
                                <AlertDescription>
                                    Your storage is almost full. Consider upgrading your plan.
                                </AlertDescription>
                            </Alert>
                        </div>
                        <div className="space-y-2">
                            <Alert className="border-red-7 bg-red-3 text-red-11">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    There was an error processing your request. Please try again.
                                </AlertDescription>
                            </Alert>
                        </div>
                        <div className="space-y-2">
                            <Alert className="border-blue-7 bg-blue-3 text-blue-11">
                                <Info className="h-4 w-4" />
                                <AlertTitle>Information</AlertTitle>
                                <AlertDescription>
                                    Maintenance scheduled for tonight between 2-4 AM.
                                </AlertDescription>
                            </Alert>
                        </div>
                    </div>
                </ExampleCard>

                {/* Loading Dialog */}
                <ExampleCard
                    title="Loading Dialog"
                    description="Modal displayed during asynchronous operations"
                >
                    <div className="space-y-6">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    onClick={handleLoadingAction}
                                    disabled={isLoading}
                                    className="transition-all duration-300"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        "Generate Report"
                                    )}
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[400px] border-sand-6 bg-sand-2">
                                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                                    <Loader2 className="h-10 w-10 animate-spin text-primary-9" />
                                    <DialogTitle className="text-center text-sand-12">Generating Report</DialogTitle>
                                    <DialogDescription className="text-center text-sand-11">
                                        Please wait while we generate your report. This might take a moment.
                                    </DialogDescription>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </ExampleCard>

                {/* Success Dialog */}
                <ExampleCard
                    title="Success Dialog"
                    description="Modal for confirming successful operations"
                >
                    <div className="space-y-6">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-green-9 hover:bg-green-10 text-sand-1 transition-all duration-300">
                                    Show Success
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[400px] border-sand-6 bg-sand-2">
                                <div className="flex flex-col items-center justify-center py-6 space-y-4">
                                    <div className="rounded-full bg-green-5 p-3">
                                        <Check className="h-6 w-6 text-green-11" />
                                    </div>
                                    <DialogTitle className="text-center text-sand-12 text-xl">Success!</DialogTitle>
                                    <DialogDescription className="text-center text-sand-11">
                                        Your changes have been saved successfully.
                                    </DialogDescription>
                                </div>
                                <DialogFooter>
                                    <Button className="w-full text-white transition-all duration-300">Continue</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </ExampleCard>

                {/* Help Dialog */}
                <ExampleCard
                    title="Help Dialog"
                    description="Modal with contextual help information"
                >
                    <div className="space-y-6">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="transition-all duration-300">
                                    <HelpCircle className="mr-2 h-4 w-4" />
                                    Need Help?
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[550px] border-sand-6 bg-sand-2">
                                <DialogHeader>
                                    <DialogTitle className="text-sand-12">Help & Documentation</DialogTitle>
                                    <DialogDescription className="text-sand-11">
                                        Quick guide to using the admin dashboard.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <h4 className="font-medium text-sand-12">Getting Started</h4>
                                        <p className="text-sm text-sand-11">
                                            The dashboard provides an overview of your metrics and recent activity.
                                            Use the sidebar navigation to access different sections.
                                        </p>
                                    </div>
                                    <Separator className="my-2 bg-sand-6" />
                                    <div className="space-y-2">
                                        <h4 className="font-medium text-sand-12">Managing Content</h4>
                                        <p className="text-sm text-sand-11">
                                            You can create, edit, and delete content from the Content section.
                                            Make sure to save your changes before navigating away.
                                        </p>
                                    </div>
                                    <Separator className="my-2 bg-sand-6" />
                                    <div className="space-y-2">
                                        <h4 className="font-medium text-sand-12">Need More Help?</h4>
                                        <p className="text-sm text-sand-11">
                                            Contact support at support@example.com or visit our documentation
                                            for more detailed guides.
                                        </p>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" className="transition-all duration-300">
                                        View Documentation
                                    </Button>
                                    <Button className="text-white transition-all duration-300">
                                        Got It
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </ExampleCard>
            </div>

            {/* Side Drawer */}
            <Separator className="my-8 bg-sand-6" />

            <ExampleCard
                title="Side Drawer"
                description="Slide-in panel for detailed views"
            >
                <div className="space-y-6">
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button variant="outline" className="transition-all duration-300">
                                View User Details
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent className="border-t border-sand-6 bg-sand-2">
                            <div className="mx-auto w-full max-w-3xl">
                                <DrawerHeader>
                                    <DrawerTitle className="text-sand-12">User Profile</DrawerTitle>
                                    <DrawerDescription className="text-sand-11">
                                        View and manage user information.
                                    </DrawerDescription>
                                </DrawerHeader>
                                <div className="p-4 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 w-16 rounded-full bg-primary-5 flex items-center justify-center">
                                            <span className="text-xl font-semibold text-primary-11">JD</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-sand-12">John Doe</h3>
                                            <p className="text-sm text-sand-11">john.doe@example.com</p>
                                        </div>
                                    </div>

                                    <Separator className="my-2 bg-sand-6" />

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label className="text-xs text-sand-11">Full Name</Label>
                                            <p className="text-sm font-medium text-sand-12">John Doe</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs text-sand-11">Email Address</Label>
                                            <p className="text-sm font-medium text-sand-12">john.doe@example.com</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs text-sand-11">Role</Label>
                                            <p className="text-sm font-medium text-sand-12">Administrator</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs text-sand-11">Status</Label>
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-green-9"></div>
                                                <p className="text-sm font-medium text-sand-12">Active</p>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator className="my-2 bg-sand-6" />

                                    <div className="space-y-2">
                                        <Label className="text-xs text-sand-11">Recent Activity</Label>
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <p className="text-sand-12">Login</p>
                                                <p className="text-sand-11">2 hours ago</p>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <p className="text-sand-12">Updated profile</p>
                                                <p className="text-sand-11">Yesterday</p>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <p className="text-sand-12">Password change</p>
                                                <p className="text-sand-11">Last week</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <DrawerFooter>
                                    <Button className="text-white transition-all duration-300">Edit Profile</Button>
                                    <DrawerClose asChild>
                                        <Button variant="outline" className="transition-all duration-300">Cancel</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
            </ExampleCard>
        </div>
    )
} 