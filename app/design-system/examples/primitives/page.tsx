"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ButtonExamples from "./buttons";
import BadgeExamples from "./badges";
import TypographyExamples from "./typography";
import FormExamples from "./forms";
import LayoutExamples from "./layout";

const sections = [
  { id: "buttons", title: "Buttons", component: ButtonExamples },
  { id: "badges", title: "Badges", component: BadgeExamples },
  { id: "typography", title: "Typography", component: TypographyExamples },
  { id: "forms", title: "Forms", component: FormExamples },
  { id: "layout", title: "Layout", component: LayoutExamples },
];

export default function PrimitivesPage() {
  const [activeSection, setActiveSection] = useState("buttons");

  return (
    <div className="relative">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-sand-12">
            Primitives
          </h1>
          <p className="text-lg text-sand-11">
            Essential building blocks of the Mercury Design System
          </p>
        </div>
      </div>

      <div className="flex flex-col space-y-8">
        {/* Navigation */}
        <div className="sticky top-0 z-30 -mx-6 bg-sand-1/95 px-6 py-4 backdrop-blur">
          <Separator className="mt-4 bg-sand-6" />
        </div>

        {/* Content */}
        <div className="relative">
          {sections.map(
            ({ id, component: Component }) =>
              activeSection === id && <Component key={id} />
          )}
        </div>
      </div>
    </div>
  );
}
