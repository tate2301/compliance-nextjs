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
            <span className='text-sm font-medium text-slate-11'>Appearance</span>
            <div className="flex gap-1 rounded-md bg-slate-3 p-1 w-fit">
                <Button onClick={() => {
                    setTheme('light')
                }} variant="ghost" className={cn("hover:text-warning-2 hover:bg-warning-9 transition-all duration-300", theme === 'light' && 'bg-warning-10 text-warning-1',)}>
                    <SunIcon className="h-4 w-4 text-slate-11" />

                </Button>
                <Button onClick={() => {
                    setTheme('dark')
                }} variant="ghost" className={cn("text-slate-11 hover:bg-slate-2 hover:text-slate-12 transition-all duration-300", theme === 'dark' && 'bg-slate-1 text-slate-12',)}>
                    <MoonIcon className="h-4 w-4 text-slate-11" />

                </Button>
            </div>

        </div>
    )
} 