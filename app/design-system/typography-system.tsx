"use client";

import React from "react";

interface TypographyExampleProps {
  variant: string;
  className: string;
  size: string;
  description: string;
  example: string;
}

function TypographyExample({
  variant,
  className,
  size,
  description,
  example,
}: TypographyExampleProps) {
  return (
    <div className="flex flex-col space-y-4 border border-slate-6 rounded-lg p-4 bg-white">
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <p className={className}>{example}</p>
          <span className="text-sm text-slate-11">{size}</span>
        </div>
        <div className="h-px bg-slate-6" />
        <p className={className}>The quick brown fox jumps over the lazy dog</p>
      </div>
      <div className="flex justify-between items-center">
        <code className="text-xs bg-slate-3 px-2 py-1 rounded">{variant}</code>
        <span className="text-xs text-slate-11">{description}</span>
      </div>
    </div>
  );
}

export default function TypographySystem() {
  const typographyScale = [
    {
      variant: "display",
      className: "text-6xl font-bold tracking-tight",
      size: "60px / 3.75rem",
      description: "Hero headers, major features",
      example: "Welcome to Mercury",
    },
    {
      variant: "h1",
      className: "text-5xl font-bold tracking-tight",
      size: "48px / 3rem",
      description: "Main page headings",
      example: "Design System Documentation",
    },
    {
      variant: "h2",
      className: "text-4xl font-bold",
      size: "36px / 2.25rem",
      description: "Section headings",
      example: "Typography Guidelines",
    },
    {
      variant: "h3",
      className: "text-3xl font-bold",
      size: "30px / 1.875rem",
      description: "Sub-section headings",
      example: "Font Weights & Styles",
    },
    {
      variant: "h4",
      className: "text-2xl font-bold",
      size: "24px / 1.5rem",
      description: "Card headings",
      example: "Feature Highlights",
    },
    {
      variant: "h5",
      className: "text-xl font-bold",
      size: "20px / 1.25rem",
      description: "Small section headings",
      example: "Component Details",
    },
    {
      variant: "large",
      className: "text-lg",
      size: "18px / 1.125rem",
      description: "Lead paragraphs",
      example:
        "Mercury Design System provides a comprehensive set of design tokens and components.",
    },
    {
      variant: "base",
      className: "text-base",
      size: "16px / 1rem",
      description: "Body text",
      example:
        "Our typography system is designed to provide clear hierarchy while maintaining excellent readability across all screen sizes.",
    },
    {
      variant: "small",
      className: "text-sm",
      size: "14px / 0.875rem",
      description: "Secondary text",
      example: "Last updated: January 2024 - Version 2.0.0",
    },
    {
      variant: "xs",
      className: "text-xs",
      size: "12px / 0.75rem",
      description: "Captions, labels",
      example: "Figure 1.1: Typography Scale Demonstration",
    },
    {
      variant: "2xs",
      className: "text-2xs",
      size: "10px / 0.625rem",
      description: "Fine print",
      example: "© 2024 Mercury Design System. All rights reserved.",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-12">Typography System</h1>
        <p className="text-slate-11">
          Our typography system uses Sohne as the primary font, with a carefully
          crafted scale for readability and hierarchy.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-12">Font Family</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 border border-slate-6 rounded-lg p-4 bg-white">
            <p className="font-normal text-xl">Sohne Regular (400)</p>
            <p className="text-slate-11">Primary font weight for body text</p>
            <div className="mt-4 space-y-2">
              <p className="font-normal">Regular text example</p>
              <p className="font-normal text-slate-11">
                Secondary text in regular weight
              </p>
              <p className="font-normal text-primary-11">
                Colored text in regular weight
              </p>
            </div>
          </div>
          <div className="space-y-2 border border-slate-6 rounded-lg p-4 bg-white">
            <p className="font-bold text-xl">Sohne Kraftig (700)</p>
            <p className="text-slate-11">
              Bold weight for headings and emphasis
            </p>
            <div className="mt-4 space-y-2">
              <p className="font-bold">Bold text example</p>
              <p className="font-bold text-slate-11">Secondary text in bold</p>
              <p className="font-bold text-primary-11">Colored text in bold</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-12">Type Scale</h2>
        <div className="grid grid-cols-1 gap-4">
          {typographyScale.map((type) => (
            <TypographyExample
              key={type.variant}
              variant={type.variant}
              className={type.className}
              size={type.size}
              description={type.description}
              example={type.example}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-12">Usage Guidelines</h2>
        <div className="prose prose-slate max-w-none space-y-4">
          <ul className="list-disc list-inside space-y-2 text-slate-11">
            <li>
              Maintain consistent spacing between text elements using our
              spacing scale
            </li>
            <li>
              Use appropriate line heights for optimal readability (already
              configured in Tailwind)
            </li>
            <li>
              Ensure sufficient color contrast for accessibility (WCAG 2.1 AA
              standard)
            </li>
            <li>
              Limit line length to 60-80 characters for optimal readability
            </li>
            <li>
              Use semantic HTML elements (h1, h2, etc.) for proper document
              structure
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-12">
          Real-world Examples
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-slate-6 rounded-lg p-6 bg-white space-y-4">
            <h3 className="text-2xl font-bold text-slate-12">Article Layout</h3>
            <h4 className="text-xl font-bold text-slate-12">
              Getting Started with Mercury
            </h4>
            <p className="text-lg text-slate-11">
              A comprehensive guide to our design system.
            </p>
            <p className="text-base">
              Mercury Design System provides a robust set of design tokens,
              components, and patterns that help teams build consistent,
              accessible interfaces.
            </p>
            <p className="text-sm text-slate-11">
              Published on January 15, 2024
            </p>
          </div>
          <div className="border border-slate-6 rounded-lg p-6 bg-white space-y-4">
            <h3 className="text-2xl font-bold text-slate-12">Card Component</h3>
            <div className="p-4 border border-slate-6 rounded-lg">
              <h5 className="text-xl font-bold text-slate-12">Feature Card</h5>
              <p className="text-base mt-2">
                Build beautiful, accessible interfaces with our comprehensive
                component library.
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-primary-11">Learn more →</span>
                <span className="text-xs text-slate-11">New</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
