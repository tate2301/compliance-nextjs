import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ComplianceItemModal({
  children,
  isOpen,
  onClose,
  onSave,
  title,
  description,
  isLoading = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  isLoading?: boolean;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[425px] lg:max-w-4xl max-h-[70vh] overflow-y-auto w-full border-slate-6 bg-slate-2">
        <DialogHeader>
          <DialogTitle className="text-slate-12">{title}</DialogTitle>
          <DialogDescription className="text-slate-11">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">{children}</div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
