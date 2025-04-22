import { PaperClipIcon } from '@heroicons/react/solid'
import { Button } from '@/components/ui/button'

export interface DocumentItemProps {
    filename: string;
    updatedDate?: string;
    onUpdate: () => void;
    onRemove: () => void;
}

export function DocumentItem({ filename, updatedDate, onUpdate, onRemove }: DocumentItemProps) {
    return (
        <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
            <div>
                <div className="w-0 flex-1 flex items-center mb-2">
                    <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-slate-11" aria-hidden="true" />
                    <p className="ml-2 flex-1 w-0">{filename}</p>
                </div>
                {updatedDate && (
                    <p className='text-xs text-slate-10'>
                        Updated {updatedDate}
                    </p>
                )}
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