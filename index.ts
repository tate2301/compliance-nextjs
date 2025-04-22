/**
 * Mercury Design System
 * 
 * A fluid, focused, and familiar design system inspired by the Mercury concept,
 * providing a seamless and intention-based user experience.
 */

// Theme and tokens
export * from './theme'

// Core components
export { default as Module } from './components/Module/Module'
export type { ModuleProps } from './components/Module/Module'

export { default as Flow } from './components/Flow/Flow'
export type { FlowProps } from './components/Flow/Flow'

export { default as Space } from './components/Space/Space'
export type { SpaceProps } from './components/Space/Space'

export { default as Locus } from './components/Locus/Locus'
export type { LocusProps, LocusSuggestion } from './components/Locus/Locus'

// Composite components
export { default as Dashboard } from './components/Dashboard/Dashboard'
export type { DashboardProps } from './components/Dashboard/Dashboard'

// Example usage
export { default as DashboardExample } from './examples/DashboardExample' 