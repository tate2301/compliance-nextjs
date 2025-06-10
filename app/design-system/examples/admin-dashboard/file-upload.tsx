'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { AlertCircle, Check, File, FileText, Image, Loader2, Upload, X } from 'lucide-react'
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

export default function FileUploadExamples() {
    const [progress, setProgress] = useState(0)

    // Simulate progress for demo purposes
    const simulateProgress = () => {
        setProgress(0)
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return prev + 10
            })
        }, 500)
        return () => clearInterval(interval)
    }

    return (
        <div className="space-y-10">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-sand-12">File Upload</h2>
                <p className="text-sand-11">Examples of file upload components for admin dashboards and data management.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic File Input */}
                <ExampleCard
                    title="Basic File Input"
                    description="Standard HTML file input with custom styling"
                >
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="basic-file">Choose File</Label>
                            <Input
                                id="basic-file"
                                type="file"
                                className="transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-5 file:text-primary-11 hover:file:bg-primary-4 file:cursor-pointer file:transition-colors"
                            />
                            <p className="text-xs text-sand-11">Max file size: 5MB</p>
                        </div>
                    </div>
                </ExampleCard>

                {/* Dropzone */}
                <ExampleCard
                    title="Dropzone"
                    description="Drag and drop file upload area"
                >
                    <div className="space-y-4">
                        <div className="border-2 border-dashed border-sand-7 rounded-lg p-6 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:border-primary-7 hover:bg-sand-3/50 cursor-pointer">
                            <Upload className="h-8 w-8 text-sand-11" />
                            <p className="text-sm font-medium text-sand-12">Drag files here or click to browse</p>
                            <p className="text-xs text-sand-11">Supports PNG, JPG, PDF up to 10MB</p>
                            <Input
                                type="file"
                                className="hidden"
                                id="dropzone-file"
                                multiple
                            />
                        </div>
                    </div>
                </ExampleCard>

                {/* Upload with Progress */}
                <ExampleCard
                    title="Upload with Progress"
                    description="File upload with progress indicator"
                >
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="upload-progress">Upload Document</Label>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-7 transition-all duration-300"
                                    onClick={simulateProgress}
                                >
                                    <Upload className="mr-2 h-3.5 w-3.5" /> Start Upload
                                </Button>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-sand-11" />
                                    <span className="text-sm text-sand-12">annual-report.pdf</span>
                                </div>
                                <Progress value={progress} className="h-2 transition-all duration-300" />
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-sand-11">{progress}% Complete</span>
                                    <span className="text-sand-11">2.4MB / 4.8MB</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </ExampleCard>

                {/* Multi-file Upload */}
                <ExampleCard
                    title="Multi-file Upload"
                    description="Interface for uploading multiple files"
                >
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label>Upload Files</Label>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-7 transition-all duration-300"
                            >
                                <Upload className="mr-2 h-3.5 w-3.5" /> Add Files
                            </Button>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 bg-sand-3 rounded-md">
                                <div className="flex items-center gap-2">
                                    <Image className="h-4 w-4 text-sand-11" />
                                    <span className="text-sm text-sand-12">product-image.png</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Check className="h-4 w-4 text-green-9" />
                                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full transition-all duration-300">
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-sand-3 rounded-md">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-sand-11" />
                                    <span className="text-sm text-sand-12">specification.pdf</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Loader2 className="h-3 w-3 animate-spin text-amber-9" />
                                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full transition-all duration-300">
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-red-3 rounded-md">
                                <div className="flex items-center gap-2">
                                    <File className="h-4 w-4 text-red-11" />
                                    <span className="text-sm text-red-11">invoice.doc</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <AlertCircle className="h-4 w-4 text-red-9" />
                                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full transition-all duration-300">
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-sand-11">3 files (2 uploaded, 1 error)</p>
                    </div>
                </ExampleCard>

                {/* Image Upload with Preview */}
                <ExampleCard
                    title="Image Upload with Preview"
                    description="Upload interface with image preview"
                >
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative aspect-square bg-sand-3 rounded-md flex items-center justify-center overflow-hidden group">
                                <div className="absolute inset-0 flex items-center justify-center bg-sand-3">
                                    <Image className="h-8 w-8 text-sand-11" />
                                </div>
                                <div className="absolute inset-0 bg-sand-12/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                                    <Button variant="secondary" size="sm" className="transition-all duration-300">
                                        <Upload className="mr-2 h-4 w-4" /> Upload
                                    </Button>
                                </div>
                            </div>
                            <div className="relative aspect-square bg-sand-3 rounded-md flex items-center justify-center overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=200&h=200&auto=format&fit=crop"
                                    alt="Preview"
                                    className="object-cover w-full h-full"
                                />
                                <div className="absolute top-1 right-1">
                                    <Button variant="destructive" size="icon" className="h-6 w-6 rounded-full transition-all duration-300">
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-sand-11">Upload product images (1/4 uploaded)</p>
                    </div>
                </ExampleCard>

                {/* Document Upload */}
                <ExampleCard
                    title="Document Upload"
                    description="Specialized interface for document uploading"
                >
                    <div className="space-y-4">
                        <div className="border border-sand-6 rounded-md overflow-hidden">
                            <div className="bg-sand-3 p-3 border-b border-sand-6">
                                <h4 className="text-sm font-medium text-sand-12">Upload Documents</h4>
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="doc-title">Document Title</Label>
                                    <Input id="doc-title" placeholder="Annual Report 2023" className="transition-all duration-300" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="doc-type">Document Type</Label>
                                    <select
                                        id="doc-type"
                                        className="flex h-9 w-full rounded-md border border-sand-6 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-sand-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-8 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option>PDF Document</option>
                                        <option>Word Document</option>
                                        <option>Excel Spreadsheet</option>
                                        <option>Presentation</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="doc-file">Select File</Label>
                                    <Input
                                        id="doc-file"
                                        type="file"
                                        className="transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-5 file:text-primary-11 hover:file:bg-primary-4"
                                    />
                                </div>
                            </div>
                            <div className="bg-sand-3 p-3 border-t border-sand-6 flex justify-end">
                                <Button className="text-white transition-all duration-300">
                                    <Upload className="mr-2 h-4 w-4" /> Upload Document
                                </Button>
                            </div>
                        </div>
                    </div>
                </ExampleCard>
            </div>

            {/* Complete Upload Component */}
            <Separator className="my-8 bg-sand-6" />

            <ExampleCard
                title="Complete File Management System"
                description="Full-featured file upload and management interface"
            >
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-base font-medium text-sand-12">Project Files</h3>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="transition-all duration-300">
                                <Upload className="mr-2 h-4 w-4" /> Upload Files
                            </Button>
                            <Button size="sm" className="text-white transition-all duration-300">
                                New Folder
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border border-sand-6 rounded-md p-3 flex flex-col hover:border-primary-7 hover:bg-sand-3/50 transition-all duration-300 cursor-pointer">
                            <div className="flex justify-between items-start mb-3">
                                <FileText className="h-8 w-8 text-primary-9" />
                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full transition-all duration-300">
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                            <h4 className="font-medium text-sand-12 truncate">project-proposal.pdf</h4>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-sand-11">2.4 MB</span>
                                <span className="text-xs text-sand-11">Updated 2 days ago</span>
                            </div>
                        </div>

                        <div className="border border-sand-6 rounded-md p-3 flex flex-col hover:border-primary-7 hover:bg-sand-3/50 transition-all duration-300 cursor-pointer">
                            <div className="flex justify-between items-start mb-3">
                                <Image className="h-8 w-8 text-indigo-9" />
                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full transition-all duration-300">
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                            <h4 className="font-medium text-sand-12 truncate">dashboard-mockup.png</h4>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-sand-11">3.8 MB</span>
                                <span className="text-xs text-sand-11">Updated yesterday</span>
                            </div>
                        </div>

                        <div className="border border-sand-6 rounded-md p-3 flex flex-col hover:border-primary-7 hover:bg-sand-3/50 transition-all duration-300 cursor-pointer">
                            <div className="flex justify-between items-start mb-3">
                                <File className="h-8 w-8 text-blue-9" />
                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full transition-all duration-300">
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                            <h4 className="font-medium text-sand-12 truncate">client-feedback.docx</h4>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-sand-11">1.2 MB</span>
                                <span className="text-xs text-sand-11">Updated 5 days ago</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-xs text-sand-11 mt-3">
                        <span>7 files, 18.2 MB used</span>
                        <span>Storage: 18.2 MB / 5 GB</span>
                    </div>
                </div>
            </ExampleCard>
        </div>
    )
} 