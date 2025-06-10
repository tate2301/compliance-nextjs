'use client'

import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

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

export default function LayoutExamples() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-sand-12">Layout Examples</h2>
                <p className="text-sand-11">Examples of layout components and patterns following our design system guidelines.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Grid Layouts */}
                <ExampleCard title="Grid Layouts">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-sand-11">Two Column Grid</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-sand-3 p-4 rounded-lg text-center text-sm text-sand-11">Column 1</div>
                                <div className="bg-sand-3 p-4 rounded-lg text-center text-sm text-sand-11">Column 2</div>
                            </div>
                            <code className="text-sm text-sand-11">grid grid-cols-2 gap-4</code>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium text-sand-11">Responsive Grid</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-sand-3 p-4 rounded-lg text-center text-sm text-sand-11">Column 1</div>
                                <div className="bg-sand-3 p-4 rounded-lg text-center text-sm text-sand-11">Column 2</div>
                                <div className="bg-sand-3 p-4 rounded-lg text-center text-sm text-sand-11">Column 3</div>
                            </div>
                            <code className="text-sm text-sand-11">grid grid-cols-1 md:grid-cols-3 gap-4</code>
                        </div>
                    </div>
                </ExampleCard>

                {/* Flex Layouts */}
                <ExampleCard title="Flex Layouts">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-sand-11">Centered Content</p>
                            <div className="flex items-center justify-center h-24 bg-sand-3 rounded-lg">
                                <div className="text-sm text-sand-11">Centered Content</div>
                            </div>
                            <code className="text-sm text-sand-11">flex items-center justify-center</code>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium text-sand-11">Space Between</p>
                            <div className="flex justify-between items-center bg-sand-3 p-4 rounded-lg">
                                <div className="text-sm text-sand-11">Left</div>
                                <div className="text-sm text-sand-11">Right</div>
                            </div>
                            <code className="text-sm text-sand-11">flex justify-between items-center</code>
                        </div>
                    </div>
                </ExampleCard>

                {/* Separator Examples */}
                <ExampleCard title="Separators">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-sand-11">Horizontal Separator</p>
                            <div className="space-y-4">
                                <div className="text-sm text-sand-11">Above separator</div>
                                <Separator />
                                <div className="text-sm text-sand-11">Below separator</div>
                            </div>
                            <code className="text-sm text-sand-11">{"<Separator />"}</code>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium text-sand-11">Vertical Separator</p>
                            <div className="flex h-12 items-center space-x-4">
                                <div className="text-sm text-sand-11">Left</div>
                                <Separator orientation="vertical" />
                                <div className="text-sm text-sand-11">Right</div>
                            </div>
                            <code className="text-sm text-sand-11">{"<Separator orientation=\"vertical\" />"}</code>
                        </div>
                    </div>
                </ExampleCard>

                {/* Scroll Area */}
                <ExampleCard title="Scroll Area">
                    <div className="space-y-4">
                        <ScrollArea className="h-48 w-full rounded-lg border border-sand-6 p-4">
                            <div className="space-y-4">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <div key={i} className="text-sm">
                                        Scrollable content item {i + 1}
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <code className="text-sm text-sand-11">ScrollArea with custom height and styling</code>
                    </div>
                </ExampleCard>

                {/* Tabs Layout */}
                <ExampleCard title="Tabs Layout">
                    <Tabs defaultValue="tab1" className="w-full">
                        <TabsList className="w-full">
                            <TabsTrigger value="tab1" className="flex-1">Tab 1</TabsTrigger>
                            <TabsTrigger value="tab2" className="flex-1">Tab 2</TabsTrigger>
                            <TabsTrigger value="tab3" className="flex-1">Tab 3</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tab1" className="p-4 bg-sand-3 mt-2 rounded-lg">
                            <p className="text-sm text-sand-11">Content for Tab 1</p>
                        </TabsContent>
                        <TabsContent value="tab2" className="p-4 bg-sand-3 mt-2 rounded-lg">
                            <p className="text-sm text-sand-11">Content for Tab 2</p>
                        </TabsContent>
                        <TabsContent value="tab3" className="p-4 bg-sand-3 mt-2 rounded-lg">
                            <p className="text-sm text-sand-11">Content for Tab 3</p>
                        </TabsContent>
                    </Tabs>
                </ExampleCard>

                {/* Responsive Container */}
                <ExampleCard title="Responsive Container">
                    <div className="space-y-4">
                        <div className="container mx-auto bg-sand-3 p-4 rounded-lg">
                            <p className="text-sm text-sand-11 text-center">Container with max-width and auto margins</p>
                        </div>
                        <code className="text-sm text-sand-11">container mx-auto</code>
                    </div>
                </ExampleCard>
            </div>
        </div>
    )
} 