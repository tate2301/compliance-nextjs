"use client";
import { useRef } from 'react'
import SignatureCanvas from 'react-signature-canvas';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SignatureInputProps {
    onEnd?: (dataUrl: string) => void;
    value?: string;
    className?: string;
    width?: number;
    height?: number;
    required?: boolean;
    disabled?: boolean;
}

export function SignatureInput({
    onEnd,
    value,
    className,
    width = 400,
    height = 200,
    required = false,
    disabled = false
}: SignatureInputProps) {
    const sigRef = useRef<any>(null)

    const clear = () => {
        sigRef.current?.clear();
        if (onEnd) onEnd('');
    }

    const save = () => {
        const dataUrl = sigRef.current?.toDataURL('image/png')
        if (onEnd && dataUrl) onEnd(dataUrl)
    }

    return (
        <div className={cn("space-y-2", className)}>
            {value ? (
                <div className="relative">
                    <img
                        src={value}
                        alt="Signature"
                        className="border  rounded-md"
                        style={{ width, height }}
                    />
                    {!disabled && (
                        <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => onEnd?.('')}
                        >
                            Clear
                        </Button>
                    )}
                </div>
            ) : (
                <>
                    <SignatureCanvas
                        ref={sigRef}
                        penColor="black"
                        canvasProps={{
                            width,
                            height,
                            className: cn(
                                'border rounded-md bg-slate-3',
                                required ? 'border-red-500' : ''
                            )
                        }}
                        onEnd={save}
                    />
                    <div className="flex gap-2">
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={clear}
                        >
                            Clear
                        </Button>
                        <Button
                            variant="default"
                            size="sm"
                            onClick={save}
                        >
                            Save
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}
