'use client'

import { Card } from '@/components/ui/card'

interface ExampleCardProps {
    title: string
    children: React.ReactNode
    className?: string
}

function ExampleCard({ title, children, className = '' }: ExampleCardProps) {
    return (
        <div className="space-y-3">
            <h3 className="text-lg font-semibold text-sand-12">{title}</h3>
            <Card className={`p-4 ${className}`}>
                {children}
            </Card>
        </div>
    )
}

export default function TypographyExamples() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-sand-12">Typography Examples</h2>
                <p className="text-sand-11">Examples of typography usage following our design system guidelines.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Headers */}
                <ExampleCard title="Headers">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-sand-12">
                                The Mercury Design System
                            </h1>
                            <code className="text-sm text-sand-11">text-4xl font-bold tracking-tight text-sand-12</code>
                        </div>
                        <div className="space-y-2">
                            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight text-sand-12">
                                Building Better Healthcare Solutions
                            </h2>
                            <code className="text-sm text-sand-11">text-3xl font-semibold tracking-tight text-sand-12</code>
                        </div>
                        <div className="space-y-2">
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-sand-12">
                                Component Documentation
                            </h3>
                            <code className="text-sm text-sand-11">text-2xl font-semibold tracking-tight text-sand-12</code>
                        </div>
                        <div className="space-y-2">
                            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-sand-12">
                                Usage Guidelines
                            </h4>
                            <code className="text-sm text-sand-11">text-xl font-semibold tracking-tight text-sand-12</code>
                        </div>
                    </div>
                </ExampleCard>

                {/* Body Text */}
                <ExampleCard title="Body Text">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-base leading-7 text-sand-12">
                                The quick brown fox jumps over the lazy dog. This paragraph demonstrates the base text style
                                used throughout the application for regular content.
                            </p>
                            <code className="text-sm text-sand-11">text-base leading-7 text-sand-12</code>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm leading-6 text-sand-11">
                                Secondary text is slightly smaller and uses a muted color to create visual hierarchy.
                                It's perfect for supporting information and metadata.
                            </p>
                            <code className="text-sm text-sand-11">text-sm leading-6 text-sand-11</code>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs leading-5 text-sand-10">
                                The smallest text size should be used sparingly, primarily for labels and captions
                                where space is limited.
                            </p>
                            <code className="text-sm text-sand-11">text-xs leading-5 text-sand-10</code>
                        </div>
                    </div>
                </ExampleCard>

                {/* Links and Inline Elements */}
                <ExampleCard title="Links and Inline Elements">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-base text-sand-12">
                                Text with a <a href="#" className="font-medium text-primary-9 hover:text-primary-10 underline">primary link</a> and
                                a <a href="#" className="font-medium text-sand-11 hover:text-sand-12 underline">secondary link</a>.
                            </p>
                            <code className="text-sm text-sand-11">text-primary-9 hover:text-primary-10 underline</code>
                        </div>
                        <div className="space-y-2">
                            <p className="text-base text-sand-12">
                                Text with <strong className="font-semibold text-sand-12">strong importance</strong> and
                                <em className="italic text-sand-12"> emphasized </em> content.
                            </p>
                            <code className="text-sm text-sand-11">font-semibold, italic</code>
                        </div>
                        <div className="space-y-2">
                            <p className="text-base text-sand-12">
                                Inline code example: <code className="relative rounded bg-sand-3 px-[0.3rem] py-[0.2rem] font-mono text-sm text-sand-12">npm install @radix-ui/colors</code>
                            </p>
                            <code className="text-sm text-sand-11">bg-sand-3 font-mono text-sm</code>
                        </div>
                    </div>
                </ExampleCard>

                {/* Lists */}
                <ExampleCard title="Lists">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <ul className="list-disc list-inside space-y-2 text-sand-12">
                                <li>First item in an unordered list</li>
                                <li>Second item with a <a href="#" className="font-medium text-primary-9 hover:text-primary-10 underline">link</a></li>
                                <li>Third item with <strong className="font-semibold">strong text</strong></li>
                            </ul>
                            <code className="text-sm text-sand-11">list-disc list-inside space-y-2</code>
                        </div>
                        <div className="space-y-2">
                            <ol className="list-decimal list-inside space-y-2 text-sand-12">
                                <li>First item in an ordered list</li>
                                <li>Second item with nested content:
                                    <ul className="list-disc list-inside pl-4 pt-2 text-sand-11">
                                        <li>Nested item one</li>
                                        <li>Nested item two</li>
                                    </ul>
                                </li>
                                <li>Third item</li>
                            </ol>
                            <code className="text-sm text-sand-11">list-decimal list-inside space-y-2</code>
                        </div>
                    </div>
                </ExampleCard>
            </div>
        </div>
    )
} 