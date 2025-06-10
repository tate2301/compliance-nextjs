// @ts-nocheck

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_THEME } from "../constants";
import { useFormContext } from "../context";
import { predefinedThemes } from "../utils/themeUtils";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function FormSettings() {
  const { form, updateForm } = useFormContext();
  const theme = form.theme || DEFAULT_THEME;

  // Local state to track input values
  const [formTitle, setFormTitle] = useState(form.title || "");
  const [formDescription, setFormDescription] = useState(
    form.description || ""
  );
  const [fontFamily, setFontFamily] = useState(theme.font || "");

  // Update local state when form changes
  useEffect(() => {
    setFormTitle(form.title || "");
    setFormDescription(form.description || "");
    setFontFamily(theme.font || "");
  }, [form.title, form.description, theme.font]);

  const handleTitleChange = (value: string) => {
    setFormTitle(value);
    updateForm({ title: value });
  };

  const handleDescriptionChange = (value: string) => {
    setFormDescription(value);
    updateForm({ description: value });
  };

  const handleFontChange = (value: string) => {
    setFontFamily(value);
    updateForm({
      theme: {
        ...theme,
        font: value,
      },
    });
  };

  const handleThemeSelect = (themeId: string) => {
    const selectedTheme = predefinedThemes.find(
      (theme) => theme.id === themeId
    );
    if (selectedTheme) {
      updateForm({
        theme: {
          ...selectedTheme,
          id: themeId,
        },
      });
    }
  };

  return (
    <div className="h-full divide-y divide-sand-200">
      {/* Basic Settings Section */}
      <section className="space-y-6 p-6">
        <div>
          <h3 className="text-sm font-medium text-sand-500">FORM SETTINGS</h3>
          <p className="text-xs text-sand-400">
            Configure your form's basic information
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="formTitle" className="text-sand-500">
              Form Title
            </Label>
            <Input
              id="formTitle"
              value={formTitle}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full bg-white"
              placeholder="Enter form title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="formDescription" className="text-sand-500">
              Description
            </Label>
            <Textarea
              id="formDescription"
              value={formDescription}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              className="w-full h-24 bg-white"
              placeholder="Enter form description"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fontFamily" className="text-sand-500">
              Font Family
            </Label>
            <Input
              id="fontFamily"
              value={fontFamily}
              onChange={(e) => handleFontChange(e.target.value)}
              className="w-full bg-white"
              placeholder="Enter font family"
            />
          </div>
        </div>
      </section>

      {/* Theme Settings Section */}
      <section className="space-y-6 p-6">
        <div>
          <h3 className="text-sm font-medium text-sand-500">THEME</h3>
          <p className="text-xs text-sand-400">
            Customize the look and feel of your form
          </p>
        </div>

        <div className="space-y-6">
          {/* Theme Presets */}
          <div className="space-y-4">
            <Label className="text-sand-500">Theme Presets</Label>
            <div className="grid grid-cols-2 gap-3">
              {predefinedThemes.map((presetTheme) => (
                <button
                  type="button"
                  key={presetTheme.id}
                  onClick={() => handleThemeSelect(presetTheme.id)}
                  className={cn(
                    "group relative rounded-lg border p-4 text-left transition-all hover:border-sand-300 hover:shadow-sm",
                    theme.id === presetTheme.id
                      ? "border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500"
                      : "border-sand-200 bg-white"
                  )}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-sand-700">
                        {presetTheme.name}
                      </h3>
                      {theme.id === presetTheme.id && (
                        <CheckIcon className="h-4 w-4 text-indigo-600" />
                      )}
                    </div>
                    <div className="flex gap-1.5">
                      {Object.values(presetTheme.colors).map((color, i) => (
                        <div
                          key={i}
                          className="h-4 w-4 rounded-full ring-1 ring-inset ring-sand-200"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <div className="space-y-4">
            <Label className="text-sand-500">Custom Colors</Label>
            <div className="space-y-4 rounded-lg border bg-white p-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor" className="text-sand-500">
                  Primary Color
                </Label>
                <div className="flex gap-3">
                  <div
                    className="h-10 w-10 rounded-lg ring-1 ring-inset ring-sand-200"
                    style={{ backgroundColor: theme.colors?.primary }}
                  />
                  <Input
                    id="primaryColor"
                    value={
                      theme.colors?.primary || DEFAULT_THEME.colors.primary
                    }
                    onChange={(e) =>
                      updateForm({
                        theme: {
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary: e.target.value,
                          },
                        },
                      })
                    }
                    className="flex-1 bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backgroundColor" className="text-sand-500">
                  Background Color
                </Label>
                <div className="flex gap-3">
                  <div
                    className="h-10 w-10 rounded-lg ring-1 ring-inset ring-sand-200"
                    style={{ backgroundColor: theme.colors?.background }}
                  />
                  <Input
                    id="backgroundColor"
                    value={
                      theme.colors?.background ||
                      DEFAULT_THEME.colors.background
                    }
                    onChange={(e) =>
                      updateForm({
                        theme: {
                          ...theme,
                          colors: {
                            ...theme.colors,
                            background: e.target.value,
                          },
                        },
                      })
                    }
                    className="flex-1 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
