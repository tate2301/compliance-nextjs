'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface LocusSuggestion {
    id: string
    text: string
    description?: string
    icon?: string | React.ReactNode
    action?: () => void
}

export interface LocusProps {
    /** Placeholder text for the input */
    placeholder?: string
    /** Whether the Locus is active/expanded */
    isActive?: boolean
    /** Function to call when the Locus is toggled */
    onToggle?: (isActive: boolean) => void
    /** Function to call when a command is executed */
    onExecute?: (command: string) => void
    /** Array of suggested commands */
    suggestions?: LocusSuggestion[]
    /** Label for screen readers */
    ariaLabel?: string
    /** Custom CSS class */
    className?: string
}

/**
 * Locus - Command line interface with NLP capabilities
 * 
 * Locus combines the power of a CLI with natural language 
 * processing and GUI discoverability, allowing users to
 * perform complex actions quickly and intuitively.
 */
export const Locus = ({
    placeholder = 'Type a command or search...',
    isActive = false,
    onToggle,
    onExecute,
    suggestions = [],
    ariaLabel = 'Command input',
    className = '',
}: LocusProps) => {
    const [active, setActive] = useState(isActive)
    const [inputValue, setInputValue] = useState('')
    const [selectedSuggestion, setSelectedSuggestion] = useState(0)
    const [filteredSuggestions, setFilteredSuggestions] = useState<LocusSuggestion[]>(suggestions)
    const inputRef = useRef<HTMLInputElement>(null)

    // Filter suggestions based on input
    useEffect(() => {
        if (inputValue.trim() === '') {
            setFilteredSuggestions(suggestions)
        } else {
            const filtered = suggestions.filter(
                suggestion => suggestion.text.toLowerCase().includes(inputValue.toLowerCase())
            )
            setFilteredSuggestions(filtered)
        }

        // Reset selection when suggestions change
        setSelectedSuggestion(0)
    }, [inputValue, suggestions])

    // Handle Locus activation
    const handleActivate = () => {
        if (!active) {
            setActive(true)
            if (onToggle) onToggle(true)

            // Focus the input after animation completes
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus()
                }
            }, 100)
        }
    }

    // Handle Locus deactivation
    const handleDeactivate = () => {
        setActive(false)
        setInputValue('')
        if (onToggle) onToggle(false)
    }

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        // Escape key closes Locus
        if (e.key === 'Escape') {
            handleDeactivate()
            return
        }

        // Arrow down selects next suggestion
        if (e.key === 'ArrowDown') {
            e.preventDefault() // Prevent cursor movement
            setSelectedSuggestion(prev =>
                prev < filteredSuggestions.length - 1 ? prev + 1 : prev
            )
            return
        }

        // Arrow up selects previous suggestion
        if (e.key === 'ArrowUp') {
            e.preventDefault() // Prevent cursor movement
            setSelectedSuggestion(prev => prev > 0 ? prev - 1 : 0)
            return
        }

        // Enter executes selected suggestion
        if (e.key === 'Enter') {
            if (filteredSuggestions.length > 0) {
                const suggestion = filteredSuggestions[selectedSuggestion]
                if (suggestion.action) {
                    suggestion.action()
                } else if (onExecute) {
                    onExecute(suggestion.text)
                }
                handleDeactivate()
            } else if (inputValue.trim() !== '' && onExecute) {
                onExecute(inputValue)
                handleDeactivate()
            }
            return
        }
    }

    // Execute a suggestion
    const executeSuggestion = (suggestion: LocusSuggestion) => {
        if (suggestion.action) {
            suggestion.action()
        } else if (onExecute) {
            onExecute(suggestion.text)
        }
        handleDeactivate()
    }

    // Animation variants for fluid motion
    const containerVariants = {
        inactive: {
            height: '40px',
            width: '100%',
            transition: {
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1]
            }
        },
        active: {
            height: 'auto',
            width: '100%',
            transition: {
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
                when: "beforeChildren",
                staggerChildren: 0.05
            }
        }
    }

    const suggestionVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.2,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    }

    return (
        <motion.div
            className={`relative z-50 ${active ? 'bg-white' : 'bg-mercury-50'} rounded-xl shadow-lg border ${active ? 'border-mercury-200' : 'border-transparent'} overflow-hidden ${className}`}
            variants={containerVariants}
            initial="inactive"
            animate={active ? "active" : "inactive"}
            onClick={handleActivate}
        >
            {/* Input area */}
            <div className={`flex items-center px-3 py-2 h-10 ${active ? 'bg-white' : 'bg-mercury-50'} rounded-xl`}>
                {/* Command icon */}
                <div className="flex items-center justify-center mr-2 text-mercury-500">
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M17 10H3M21 6H3M21 14H3M17 18H3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                {/* Input field */}
                <input
                    ref={inputRef}
                    type="text"
                    className="flex-1 border-none bg-transparent text-sm text-mercury-900 outline-none caret-focus"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    aria-label={ariaLabel}
                />

                {/* Keyboard shortcut hint (only shown when inactive) */}
                {!active && (
                    <div className="text-xs text-mercury-400 flex items-center gap-1">
                        <kbd className="inline-flex items-center justify-center bg-mercury-200 px-1.5 min-w-4 rounded text-xs">
                            ⌘
                        </kbd>
                        <kbd className="inline-flex items-center justify-center bg-mercury-200 px-1.5 min-w-4 rounded text-xs">
                            K
                        </kbd>
                    </div>
                )}

                {/* Close button (only shown when active) */}
                {active && (
                    <button
                        className="bg-none border-none cursor-pointer text-mercury-400 w-6 h-6 flex items-center justify-center rounded hover:bg-mercury-100 hover:text-mercury-500"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDeactivate()
                        }}
                        aria-label="Close"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M18 6L6 18M6 6l12 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                )}
            </div>

            {/* Suggestions area (only shown when active) */}
            <AnimatePresence>
                {active && filteredSuggestions.length > 0 && (
                    <motion.div
                        className="max-h-[300px] overflow-y-auto py-2 border-t border-mercury-100"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {filteredSuggestions.map((suggestion, index) => (
                            <motion.div
                                key={suggestion.id}
                                variants={suggestionVariants}
                                initial="hidden"
                                animate="visible"
                                className={`px-3 py-2 flex items-center cursor-pointer ${index === selectedSuggestion ? 'bg-mercury-100' : 'bg-transparent'} transition-colors duration-100`}
                                onClick={() => executeSuggestion(suggestion)}
                            >
                                {/* Suggestion icon */}
                                {suggestion.icon && (
                                    <div className="flex items-center justify-center mr-3 w-6 text-mercury-500">
                                        {typeof suggestion.icon === 'string' ? (
                                            <span>{suggestion.icon}</span>
                                        ) : (
                                            suggestion.icon
                                        )}
                                    </div>
                                )}

                                <div className="flex-1">
                                    {/* Suggestion text */}
                                    <div className="text-sm font-medium text-mercury-900">
                                        {suggestion.text}
                                    </div>

                                    {/* Suggestion description (if available) */}
                                    {suggestion.description && (
                                        <div className="text-xs text-mercury-500 mt-0.5">
                                            {suggestion.description}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
} 