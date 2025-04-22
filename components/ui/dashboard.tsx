'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Space } from '@/components/ui/space'
import { Flow } from '@/components/ui/flow'
import { Module } from '@/components/ui/module'
import { Locus } from '@/components/ui/locus'

export interface DashboardProps {
    /** User name for personalization */
    userName?: string
    /** URL for user avatar */
    userAvatar?: string
    /** Optional space title override (defaults to personalized greeting) */
    spaceTitle?: string
    /** Optional description for the space */
    spaceDescription?: string
    /** Optional background image for the space header */
    backgroundImage?: string
    /** Custom CSS class */
    className?: string
}

/**
 * Dashboard - A Mercury-inspired modern dashboard
 * 
 * Integrates Space, Flow, Module, and Locus components to create
 * a complete fluid interface that responds to user intent.
 */
export const Dashboard = ({
    userName = 'there',
    userAvatar,
    spaceTitle,
    spaceDescription = 'Your personalized workspace',
    backgroundImage,
    className = '',
}: DashboardProps) => {
    // Default greeting for space title
    const defaultTitle = `Hello, ${userName}`
    const title = spaceTitle || defaultTitle

    // Collaborators list for demo
    const collaborators = [
        {
            id: 'ai-assistant',
            name: 'AI Assistant',
            avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Mercury',
            isAI: true,
        },
        {
            id: 'user',
            name: userName || 'User',
            avatar: userAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
            isAI: false,
        }
    ]

    // State for modules
    const [tasks, setTasks] = useState([
        {
            id: 'task-1',
            title: 'Upcoming Tasks',
            content: (
                <div className="text-sm text-mercury-600">
                    <ul className="pl-5 m-0">
                        <li className="mb-2">Complete Mercury design system</li>
                        <li className="mb-2">Implement dashboard layout</li>
                        <li className="mb-2">Review component accessibility</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'task-2',
            title: 'Project Status',
            content: (
                <div className="flex flex-col gap-3">
                    <div>
                        <div className="text-sm font-medium text-mercury-800 mb-1">
                            Design System
                        </div>
                        <div className="h-2 bg-mercury-200 rounded overflow-hidden">
                            <div className="h-full w-3/4 bg-focus rounded" />
                        </div>
                        <div className="text-xs text-mercury-500 mt-1">
                            75% Complete
                        </div>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-mercury-800 mb-1">
                            Dashboard Implementation
                        </div>
                        <div className="h-2 bg-mercury-200 rounded overflow-hidden">
                            <div className="h-full w-[45%] bg-focus rounded" />
                        </div>
                        <div className="text-xs text-mercury-500 mt-1">
                            45% Complete
                        </div>
                    </div>
                </div>
            )
        }
    ])

    const [insights, setInsights] = useState([
        {
            id: 'insight-1',
            title: 'System Performance',
            content: (
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-mercury-600">CPU Usage</div>
                        <div className="text-sm font-medium text-mercury-800">32%</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-mercury-600">Memory</div>
                        <div className="text-sm font-medium text-mercury-800">4.2 GB / 16 GB</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-mercury-600">Network</div>
                        <div className="text-sm font-medium text-mercury-800">12.8 Mbps</div>
                    </div>
                </div>
            )
        },
        {
            id: 'insight-2',
            title: 'Recent Activity',
            content: (
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-mercury-100 flex items-center justify-center text-mercury-500">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-mercury-800">
                                Home page redesign
                            </div>
                            <div className="text-xs text-mercury-500">
                                Updated 2 hours ago
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-mercury-100 flex items-center justify-center text-mercury-500">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-mercury-800">
                                Documentation update
                            </div>
                            <div className="text-xs text-mercury-500">
                                Updated 5 hours ago
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    ])

    // Locus command suggestions
    const locusSuggestions = [
        {
            id: 'create-task',
            text: 'Create new task',
            description: 'Add a new task to your list',
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            action: () => {
                // Add new task logic here
                console.log('Creating new task')
            }
        },
        {
            id: 'analyze-data',
            text: 'Analyze data',
            description: 'Generate insights from your data',
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            action: () => {
                // Analyze data logic here
                console.log('Analyzing data')
            }
        },
        {
            id: 'schedule-meeting',
            text: 'Schedule meeting',
            description: 'Create a new calendar event',
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            action: () => {
                // Schedule meeting logic here
                console.log('Scheduling meeting')
            }
        }
    ]

    // Handle when a Module is focused
    const handleModuleFocus = (moduleId: string) => {
        console.log(`Module focused: ${moduleId}`)
    }

    // Handle adding a new module
    const handleAddTaskModule = () => {
        const newTask = {
            id: `task-${tasks.length + 1}`,
            title: `New Task ${tasks.length + 1}`,
            content: (
                <div className="text-sm text-mercury-600">
                    Click to edit this new task module
                </div>
            )
        }

        setTasks([...tasks, newTask])
    }

    const handleAddInsightModule = () => {
        const newInsight = {
            id: `insight-${insights.length + 1}`,
            title: `New Insight ${insights.length + 1}`,
            content: (
                <div className="text-sm text-mercury-600">
                    Click to edit this new insight module
                </div>
            )
        }

        setInsights([...insights, newInsight])
    }

    // Handle Locus command execution
    const handleExecuteCommand = (command: string) => {
        console.log(`Executing command: ${command}`)
        // Handle command logic here
    }

    return (
        <div
            className={`h-full bg-mercury-50 p-4 ${className}`}
        >
            <Space
                title={title}
                description={spaceDescription}
                backgroundImage={backgroundImage}
                collaborators={collaborators}
            >
                {/* Tasks Flow */}
                <Flow
                    title="Tasks"
                    onAddModule={handleAddTaskModule}
                >
                    {tasks.map(task => (
                        <Module
                            key={task.id}
                            title={task.title}
                            width={300}
                            onFocus={() => handleModuleFocus(task.id)}
                        >
                            {task.content}
                        </Module>
                    ))}
                </Flow>

                {/* Insights Flow */}
                <Flow
                    title="Insights"
                    onAddModule={handleAddInsightModule}
                >
                    {insights.map(insight => (
                        <Module
                            key={insight.id}
                            title={insight.title}
                            width={300}
                            onFocus={() => handleModuleFocus(insight.id)}
                        >
                            {insight.content}
                        </Module>
                    ))}
                </Flow>

                {/* Global Locus */}
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[600px] max-w-[90%]">
                    <Locus
                        suggestions={locusSuggestions}
                        onExecute={handleExecuteCommand}
                    />
                </div>
            </Space>
        </div>
    )
} 