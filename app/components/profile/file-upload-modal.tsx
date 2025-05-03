import { useState, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Upload, Loader2, AlertCircle } from 'lucide-react'

export interface FileUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (file: File) => void;
    title?: string;
    description?: string;
    children?: ReactNode;
    isLoading?: boolean;
}

export function FileUploadModal({ 
    isOpen, 
    onClose, 
    onUpload, 
    title = "Upload Document",
    description = "Upload a new identity document to your profile.",
    children,
    isLoading = false
}: FileUploadModalProps) {
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        setUploadProgress(0);

        // Simulate file upload progress
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    onUpload(file);
                    return 100;
                }
                return prev + 10;
            });
        }, 500);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] border-slate-6 bg-slate-2">
                <DialogHeader>
                    <DialogTitle className="text-slate-12">{title}</DialogTitle>
                    <DialogDescription className="text-slate-11">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    {children}
                    
                    <div className="border-2 border-dashed border-slate-7 rounded-lg p-6 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:border-primary-7 hover:bg-slate-3/50 cursor-pointer">
                        <Upload className="h-8 w-8 text-slate-11" />
                        <p className="text-sm font-medium text-slate-12">Drag files here or click to browse</p>
                        <p className="text-xs text-slate-11">Supports PDF, JPG, PNG up to 10MB</p>
                        <Input
                            type="file"
                            className="hidden"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            accept=".pdf,.jpg,.jpeg,.png"
                        />
                    </div>
                    {file && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-slate-11" />
                                <span className="text-sm text-slate-12">{file.name}</span>
                            </div>
                            {isUploading && (
                                <>
                                    <Progress value={uploadProgress} className="h-2" />
                                    <div className="flex justify-between text-xs text-slate-11">
                                        <span>{uploadProgress}% Complete</span>
                                        <span>{Math.round(file.size / 1024)} KB</span>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button 
                        onClick={handleUpload} 
                        disabled={!file || isUploading || isLoading}
                    >
                        {isUploading || isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            'Upload'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}