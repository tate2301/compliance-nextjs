'use client'

import { ReactNode, Children, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface FlowProps {
    /** Array of Module components or other content */
    children: ReactNode
    /** Optional title for the Flow */
    title?: string
    /** Whether to show an add module button */
    showAddButton?: boolean
    /** Handler for adding a new module */
    onAddModule?: () => void
    /** Custom CSS class */
    className?: string
}

/**
 * Flow - A horizontal row of Modules
 * 
 * Flows organize related modules into a horizontal sequence,
 * allowing users to move through a logical progression of tasks.
 */
export const Flow = ({
    children,
    title,
    showAddButton = true,
    onAddModule,
    className = '',
}: FlowProps) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [scrollPosition, setScrollPosition] = useState(0)
    const flowRef = useRef<HTMLDivElement>(null)

    // Count the number of children
    const moduleCount = Children.count(children)

    // Handle scrolling within the flow
    const handleScroll = (direction: 'left' | 'right') => {
        if (!flowRef.current) return

        const container = flowRef.current
        const scrollAmount = container.clientWidth * 0.8

        if (direction === 'left') {
            container.scrollLeft -= scrollAmount
            setScrollPosition(Math.max(0, scrollPosition - scrollAmount))
        } else {
            container.scrollLeft += scrollAmount
            setScrollPosition(scrollPosition + scrollAmount)
        }
    }

    // Check if scroll indicators should be visible
    const [showLeftScroll, setShowLeftScroll] = useState(false)
    const [showRightScroll, setShowRightScroll] = useState(false)

    useEffect(() => {
        const checkScroll = () => {
            if (flowRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = flowRef.current
                setShowLeftScroll(scrollLeft > 0)
                setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10)
            }
        }

        checkScroll()

        const container = flowRef.current
        if (container) {
            container.addEventListener('scroll', checkScroll)
            return () => container.removeEventListener('scroll', checkScroll)
        }
    }, [children])

    return (
        <div className={`flex flex-col mb-6 ${className}`}>
            {title && (
                <h2 className="text-xl font-semibold text-mercury-800 mb-3 px-2">
                    {title}
                </h2>
            )}

            <div className="relative">
                {/* Left scroll indicator */}
                <AnimatePresence>
                    {showLeftScroll && (
                        <motion.button
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-white border-none shadow-md cursor-pointer"
                            onClick={() => handleScroll('left')}
                            aria-label="Scroll left"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10 12L6 8L10 4"
                                    stroke="#475569"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Modules container with horizontal scrolling */}
                <div
                    ref={flowRef}
                    className="flex overflow-x-auto gap-4 px-1 py-2 pb-3 scrollbar-hide scroll-smooth"
                >
                    {children}

                    {/* Add module button */}
                    {showAddButton && (
                        <div className="min-w-[200px] h-[200px] flex items-center justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onAddModule}
                                className="w-12 h-12 rounded-xl bg-mercury-100 border border-dashed border-mercury-400 flex items-center justify-center cursor-pointer text-mercury-500"
                                aria-label="Add module"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 5V19M5 12H19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </motion.button>
                        </div>
                    )}
                </div>

                {/* Right scroll indicator */}
                <AnimatePresence>
                    {showRightScroll && (
                        <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-white border-none shadow-md cursor-pointer"
                            onClick={() => handleScroll('right')}
                            aria-label="Scroll right"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6 4L10 8L6 12"
                                    stroke="#475569"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
} 