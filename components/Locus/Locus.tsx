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
            className={`locus ${active ? 'locus--active' : ''} ${className}`}
            variants={containerVariants}
            initial="inactive"
            animate={active ? "active" : "inactive"}
            style={{
                position: 'relative',
                background: active ? '#ffffff' : '#f8fafc',
                borderRadius: '12px',
                boxShadow: active
                    ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    : 'none',
                border: active ? '1px solid #e2e8f0' : '1px solid transparent',
                overflow: 'hidden',
                zIndex: active ? 50 : 1,
                transition: 'background 0.2s ease'
            }}
            onClick={handleActivate}
        >
            {/* Input area */}
            <div
                className="locus__input-container"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    height: '40px',
                    background: active ? '#ffffff' : '#f8fafc',
                    borderRadius: '12px'
                }}
            >
                {/* Command icon */}
                <div
                    className="locus__icon"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '8px',
                        color: '#64748b'
                    }}
                >
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
                    className="locus__input"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    aria-label={ariaLabel}
                    style={{
                        flex: '1',
                        border: 'none',
                        background: 'transparent',
                        fontSize: '0.875rem',
                        color: '#0f172a',
                        outline: 'none',
                        caretColor: '#1c6bcf'
                    }}
                />

                {/* Keyboard shortcut hint (only shown when inactive) */}
                {!active && (
                    <div
                        className="locus__shortcut"
                        style={{
                            fontSize: '0.75rem',
                            color: '#94a3b8',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}
                    >
                        <kbd
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: '#e2e8f0',
                                padding: '1px 5px',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                minWidth: '16px'
                            }}
                        >
                            ⌘
                        </kbd>
                        <kbd
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: '#e2e8f0',
                                padding: '1px 5px',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                minWidth: '16px'
                            }}
                        >
                            K
                        </kbd>
                    </div>
                )}

                {/* Close button (only shown when active) */}
                {active && (
                    <button
                        className="locus__close"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDeactivate()
                        }}
                        aria-label="Close"
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#94a3b8',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '4px',
                            padding: 0
                        }}
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
                        className="locus__suggestions"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            maxHeight: '300px',
                            overflowY: 'auto',
                            padding: '8px 0',
                            borderTop: '1px solid #f1f5f9'
                        }}
                    >
                        {filteredSuggestions.map((suggestion, index) => (
                            <motion.div
                                key={suggestion.id}
                                variants={suggestionVariants}
                                initial="hidden"
                                animate="visible"
                                className={`locus__suggestion ${index === selectedSuggestion ? 'locus__suggestion--selected' : ''}`}
                                style={{
                                    padding: '8px 12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    background: index === selectedSuggestion ? '#f1f5f9' : 'transparent',
                                    transition: 'background 0.1s ease'
                                }}
                                onClick={() => executeSuggestion(suggestion)}
                            >
                                {/* Suggestion icon */}
                                {suggestion.icon && (
                                    <div
                                        className="locus__suggestion-icon"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '12px',
                                            width: '24px',
                                            color: '#64748b'
                                        }}
                                    >
                                        {typeof suggestion.icon === 'string' ? (
                                            <span>{suggestion.icon}</span>
                                        ) : (
                                            suggestion.icon
                                        )}
                                    </div>
                                )}

                                <div style={{ flex: 1 }}>
                                    {/* Suggestion text */}
                                    <div
                                        className="locus__suggestion-text"
                                        style={{
                                            fontSize: '0.875rem',
                                            fontWeight: 500,
                                            color: '#0f172a'
                                        }}
                                    >
                                        {suggestion.text}
                                    </div>

                                    {/* Suggestion description (if available) */}
                                    {suggestion.description && (
                                        <div
                                            className="locus__suggestion-description"
                                            style={{
                                                fontSize: '0.75rem',
                                                color: '#64748b',
                                                marginTop: '2px'
                                            }}
                                        >
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

export default Locus 