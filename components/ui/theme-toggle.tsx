'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Switch } from '@/components/ui/switch'
import { Button, ButtonGroup } from '@/app/components/ui/button'
import { cn } from '@/lib/utils'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <div className="flex items-center space-x-2 w-full justify-between">
            <div className="flex gap-1 rounded-md bg-sand-3 p-1 w-fit">
                <Button onClick={() => {
                    setTheme('light')
                }} variant="ghost" className={cn("hover:text-warning-2 hover:bg-warning-9 transition-all duration-300", theme === 'light' && 'bg-warning-10 text-warning-1',)}>
                    <SunIcon className="h-4 w-4 text-sand-11" />

                </Button>
                <Button onClick={() => {
                    setTheme('dark')
                }} variant="ghost" className={cn("text-sand-11 hover:bg-sand-2 hover:text-sand-12 transition-all duration-300", theme === 'dark' && 'bg-sand-1 text-sand-12',)}>
                    <MoonIcon className="h-4 w-4 text-sand-11" />

                </Button>
            </div>

        </div>
    )
} 