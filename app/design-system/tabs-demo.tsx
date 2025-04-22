'use client'

import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function TabsDemo() {
    const [defaultTab, setDefaultTab] = useState('account')
    const [primaryTab, setPrimaryTab] = useState('account')
    const [secondaryTab, setSecondaryTab] = useState('account')
    const [outlineTab, setOutlineTab] = useState('account')
    const [ghostTab, setGhostTab] = useState('account')
    const [tealTab, setTealTab] = useState('account')
    const [purpleTab, setPurpleTab] = useState('account')
    const [amberTab, setAmberTab] = useState('account')
    const [roseTab, setRoseTab] = useState('account')
    const [gradientTab, setGradientTab] = useState('account')
    const [smallTab, setSmallTab] = useState('account')
    const [largeTab, setLargeTab] = useState('account')

    return (
        <div className="space-y-12">
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-12">Tab Variants</h2>
                <p className="text-slate-11">Examples of different tab styles and variants</p>
            </div>

            <div className="space-y-8">
                {/* Default Tabs */}
                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-slate-12">Default</h3>
                    <Tabs
                        defaultValue="account"
                        value={defaultTab}
                        onValueChange={setDefaultTab}
                    >
                        <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                            <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="py-4 px-6 bg-slate-2 rounded-md mt-3">
                        <p className="text-slate-11">Active tab: <span className="text-slate-12 font-medium">{defaultTab}</span></p>
                    </div>
                </div>

                {/* Primary Tabs */}
                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-slate-12">Primary</h3>
                    <Tabs
                        defaultValue="account"
                        value={primaryTab}
                        onValueChange={setPrimaryTab}
                        variant="primary"
                    >
                        <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                            <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="py-4 px-6 bg-primary-1 rounded-md mt-3">
                        <p className="text-primary-11">Active tab: <span className="text-primary-12 font-medium">{primaryTab}</span></p>
                    </div>
                </div>

                {/* Secondary Tabs */}
                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-slate-12">Secondary</h3>
                    <Tabs
                        defaultValue="account"
                        value={secondaryTab}
                        onValueChange={setSecondaryTab}
                        variant="secondary"
                    >
                        <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                            <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="py-4 px-6 bg-secondary-1 rounded-md mt-3">
                        <p className="text-secondary-11">Active tab: <span className="text-secondary-12 font-medium">{secondaryTab}</span></p>
                    </div>
                </div>

                {/* Outline Tabs */}
                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-slate-12">Outline</h3>
                    <Tabs
                        defaultValue="account"
                        value={outlineTab}
                        onValueChange={setOutlineTab}
                        variant="outline"
                    >
                        <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                            <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="py-4 px-6 bg-slate-2 border border-slate-6 rounded-md mt-3">
                        <p className="text-slate-11">Active tab: <span className="text-slate-12 font-medium">{outlineTab}</span></p>
                    </div>
                </div>

                {/* Ghost Tabs */}
                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-slate-12">Ghost</h3>
                    <Tabs
                        defaultValue="account"
                        value={ghostTab}
                        onValueChange={setGhostTab}
                        variant="ghost"
                    >
                        <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                            <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="py-4 px-6 bg-slate-2 rounded-md mt-3">
                        <p className="text-slate-11">Active tab: <span className="text-slate-12 font-medium">{ghostTab}</span></p>
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-8">
                <h2 className="text-2xl font-semibold text-slate-12">Colorful Variants</h2>
                <p className="text-slate-11">Vibrant color options for a more lively interface</p>
            </div>

            <div className="space-y-8">
                {/* Teal Tabs */}
                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-slate-12">Teal</h3>
                    <Tabs
                        defaultValue="account"
                        value={tealTab}
                        onValueChange={setTealTab}
                        variant="teal"
                    >
                        <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                            <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="py-4 px-6 bg-teal-50 border border-teal-100 rounded-md mt-3">
                        <p className="text-teal-700">Active tab: <span className="text-teal-800 font-medium">{tealTab}</span></p>
                    </div>
                </div>

                {/* Purple Tabs */}
                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-slate-12">Purple</h3>
                    <Tabs
                        defaultValue="account"
                        value={purpleTab}
                        onValueChange={setPurpleTab}
                        variant="purple"
                    >
                        <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                            <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="py-4 px-6 bg-purple-50 border border-purple-100 rounded-md mt-3">
                        <p className="text-purple-700">Active tab: <span className="text-purple-800 font-medium">{purpleTab}</span></p>
                    </div>
                </div>

                {/* Amber Tabs */}
                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-slate-12">Amber</h3>
                    <Tabs
                        defaultValue="account"
                        value={amberTab}
                        onValueChange={setAmberTab}
                        variant="amber"
                    >
                        <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                            <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="py-4 px-6 bg-amber-50 border border-amber-100 rounded-md mt-3">
                        <p className="text-amber-700">Active tab: <span className="text-amber-800 font-medium">{amberTab}</span></p>
                    </div>
                </div>

                {/* Rose Tabs */}
                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-slate-12">Rose</h3>
                    <Tabs
                        defaultValue="account"
                        value={roseTab}
                        onValueChange={setRoseTab}
                        variant="rose"
                    >
                        <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                            <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="py-4 px-6 bg-rose-50 border border-rose-100 rounded-md mt-3">
                        <p className="text-rose-700">Active tab: <span className="text-rose-800 font-medium">{roseTab}</span></p>
                    </div>
                </div>

                {/* Gradient Tabs */}
                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-slate-12">Gradient</h3>
                    <Tabs
                        defaultValue="account"
                        value={gradientTab}
                        onValueChange={setGradientTab}
                        variant="gradient"
                    >
                        <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                            <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="py-4 px-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-slate-200 rounded-md mt-3">
                        <p className="text-indigo-700">Active tab: <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 font-medium">{gradientTab}</span></p>
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-8">
                <h2 className="text-2xl font-semibold text-slate-12">Tab Sizes</h2>
                <p className="text-slate-11">Available in different sizes to suit your design needs</p>
            </div>

            <div className="space-y-8">
                {/* Small Tabs */}
                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-slate-12">Small</h3>
                    <Tabs
                        defaultValue="account"
                        value={smallTab}
                        onValueChange={setSmallTab}
                        size="sm"
                        variant="purple"
                    >
                        <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                            <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Default (Medium) Tabs */}
                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-slate-12">Medium (Default)</h3>
                    <Tabs
                        defaultValue="account"
                        variant="teal"
                    >
                        <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                            <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Large Tabs */}
                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-slate-12">Large</h3>
                    <Tabs
                        defaultValue="account"
                        value={largeTab}
                        onValueChange={setLargeTab}
                        size="lg"
                        variant="rose"
                    >
                        <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                            <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            <div className="space-y-4 pt-8">
                <h2 className="text-2xl font-semibold text-slate-12">Mixed Variants</h2>
                <p className="text-slate-11">You can also mix different variants in the same tab list</p>
            </div>

            <div className="space-y-4">
                <Tabs defaultValue="account">
                    <TabsList className="bg-gradient-to-r from-teal-50 via-purple-50 to-amber-50 p-1 rounded-md">
                        <TabsTrigger value="account" variant="teal">Account</TabsTrigger>
                        <TabsTrigger value="password" variant="purple">Password</TabsTrigger>
                        <TabsTrigger value="settings" variant="amber">Settings</TabsTrigger>
                        <TabsTrigger value="notifications" variant="rose">Notifications</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="space-y-4 pt-8">
                <h2 className="text-2xl font-semibold text-slate-12">Creative Examples</h2>
                <p className="text-slate-11">Tabs in real-world contexts</p>
            </div>

            <div className="space-y-8">
                {/* Gradient Tabs with Content */}
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                    <Tabs defaultValue="analytics" variant="gradient">
                        <div className="px-4 pt-4">
                            <TabsList className="w-full">
                                <TabsTrigger value="analytics" className="flex-1">Analytics</TabsTrigger>
                                <TabsTrigger value="reports" className="flex-1">Reports</TabsTrigger>
                                <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="p-6">
                            {/* Tab content would go here */}
                            <div className="h-48 bg-gradient-to-br from-indigo-50 to-pink-50 rounded-md flex items-center justify-center">
                                <p className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
                                    Analytics Dashboard Content
                                </p>
                            </div>
                        </div>
                    </Tabs>
                </div>

                {/* Calendar Tabs */}
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                    <Tabs defaultValue="week" variant="teal">
                        <div className="p-4 border-b border-slate-100">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-slate-12">Calendar</h3>
                                <TabsList>
                                    <TabsTrigger value="day">Day</TabsTrigger>
                                    <TabsTrigger value="week">Week</TabsTrigger>
                                    <TabsTrigger value="month">Month</TabsTrigger>
                                </TabsList>
                            </div>

                            <div className="h-40 bg-teal-50 rounded-md flex items-center justify-center">
                                <p className="text-teal-700">Weekly calendar view</p>
                            </div>
                        </div>
                    </Tabs>
                </div>
            </div>
        </div>
    )
} 