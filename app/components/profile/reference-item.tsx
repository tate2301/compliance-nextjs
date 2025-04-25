import { PaperClipIcon, UserIcon } from '@heroicons/react/solid'
import { Button } from '@/components/ui/button'

export interface DocumentItemProps {
    email_address: string;
    fullname: string;
    updatedDate?: string;
    onUpdate: () => void;
    onRemove: () => void;
}

export function ReferenceItem({ email_address, fullname, updatedDate, onUpdate, onRemove }: DocumentItemProps) {
    return (
        <li className="pl-3 pr-4 py-3 flex flex-wrap items-center justify-between text-sm">
            <div className="flex-1 flex items-center mb-2">
                <UserIcon className="flex-shrink-0 h-5 w-5 text-slate-11" aria-hidden="true" />
                <div>
                    <p className="ml-2 flex-1">{fullname}</p>
                    <p className="ml-2 flex-1 text-slate-10">{email_address}</p>
                </div>
            </div>
            <div className="ml-4 flex-shrink-0 flex space-x-4">
                <Button
                    variant="ghost"
                    className="text-primary-11 hover:text-primary-12"
                    onClick={onUpdate}
                >
                    Update
                </Button>
                <span className="text-slate-8" aria-hidden="true">|</span>
                <Button
                    variant="ghost"
                    className="text-error-11 hover:text-error-12"
                    onClick={onRemove}
                >
                    Remove
                </Button>
            </div>
        </li>
    );
} 