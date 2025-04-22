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
        <div
            className={`flow ${className}`}
            style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '24px'
            }}
        >
            {title && (
                <h2
                    className="flow__title"
                    style={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: '#1e293b',
                        marginBottom: '12px',
                        paddingLeft: '8px'
                    }}
                >
                    {title}
                </h2>
            )}

            <div
                className="flow__container"
                style={{
                    position: 'relative'
                }}
            >
                {/* Left scroll indicator */}
                <AnimatePresence>
                    {showLeftScroll && (
                        <motion.button
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                            className="flow__scroll flow__scroll--left"
                            onClick={() => handleScroll('left')}
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 10,
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'white',
                                border: 'none',
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                                cursor: 'pointer'
                            }}
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
                    className="flow__modules"
                    style={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollBehavior: 'smooth',
                        gap: '16px',
                        padding: '8px 4px',
                        // Hide scrollbar
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch',
                        paddingBottom: '12px'
                    }}
                >
                    {children}

                    {/* Add module button */}
                    {showAddButton && (
                        <div
                            style={{
                                minWidth: '200px',
                                height: '200px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onAddModule}
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: '#f1f5f9',
                                    border: '1px dashed #94a3b8',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: '#64748b'
                                }}
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
                            className="flow__scroll flow__scroll--right"
                            onClick={() => handleScroll('right')}
                            style={{
                                position: 'absolute',
                                right: 0,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 10,
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'white',
                                border: 'none',
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                                cursor: 'pointer'
                            }}
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

            {/* Style for the hidden scrollbar */}
            <style jsx>{`
        .flow__modules::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    )
}

export default Flow 