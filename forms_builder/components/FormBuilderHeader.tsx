// @ts-nocheck

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeftIcon,
  EyeIcon,
  SaveIcon,
  Share2Icon,
  SettingsIcon,
} from "lucide-react";

interface FormBuilderHeaderProps {
  onPreviewClick: () => void;
  onPublishClick: () => void;
  formTitle?: string;
  formDescription?: string;
}

export function FormBuilderHeader({
  onPreviewClick,
  onPublishClick,
  formTitle = "Untitled Form",
  formDescription = "Build and customize your form",
}: FormBuilderHeaderProps) {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="shrink-0">
            <ArrowLeftIcon className="h-5 w-5 text-sand-600" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-sand-900">{formTitle}</h1>
            <p className="text-sm text-sand-500">{formDescription}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Share2Icon className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="ghost" size="sm">
            <SettingsIcon className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Separator orientation="vertical" className="mx-2 h-6" />
          <Button variant="outline" size="sm" onClick={onPreviewClick}>
            <EyeIcon className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button size="sm" onClick={onPublishClick}>
            <SaveIcon className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </header>
  );
}
