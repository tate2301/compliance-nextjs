import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Loader2 } from 'lucide-react'

export interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    title: string;
    description?: string;
    children: React.ReactNode;
    isLoading?: boolean;
}

export function EditModal({ isOpen, onClose, onSave, title, description, children, isLoading }: EditModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] border-slate-6 bg-slate-2">
                <DialogHeader>
                    <DialogTitle className="text-slate-12">{title}</DialogTitle>
                    {description && (
                        <DialogDescription className="text-slate-11">
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>
                <div className="py-4">
                    {children}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={onSave} disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            'Save'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
