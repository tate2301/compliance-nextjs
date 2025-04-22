import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export interface EditableFieldProps {
    label: string;
    value: string;
    isEditing: boolean;
    onEdit: () => void;
    onSave: () => void;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    renderValue?: (value: string) => React.ReactNode;
}

export function EditableField({
    label,
    value,
    isEditing,
    onEdit,
    onSave,
    onChange,
    placeholder,
    type = "text",
    renderValue
}: EditableFieldProps) {
    return (
        <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-slate-11">{label}</dt>
            <dd className="mt-1 flex text-sm text-slate-12 sm:mt-0 sm:col-span-2">
                {isEditing ? (
                    <Input
                        className="flex-grow"
                        type={type}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                    />
                ) : (
                    <span className="flex-grow">
                        {renderValue ? renderValue(value) : value}
                    </span>
                )}
                <span className="ml-4 flex-shrink-0">
                    <Button
                        variant="ghost"
                        className="text-primary-11 hover:text-primary-12"
                        onClick={() => isEditing ? onSave() : onEdit()}
                    >
                        {isEditing ? 'Save' : 'Update'}
                    </Button>
                </span>
            </dd>
        </div>
    );
} 