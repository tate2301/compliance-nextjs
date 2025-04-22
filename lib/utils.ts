import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names and merges Tailwind classes intelligently
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Converts a camelCase string to kebab-case
 */
export function toKebabCase(str: string) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Formats a color token as a CSS variable
 * For example: primary.hover -> --mercury-primary-hover
 */
export function formatColorToken(path: string) {
    const kebabPath = toKebabCase(path);
    return `--mercury-${kebabPath}`;
}

/**
 * Checks if a value is defined (not null or undefined)
 */
export function isDefined<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
}

/**
 * Creates a range of numbers [start, end)
 */
export function range(start: number, end: number) {
    return Array.from({ length: end - start }, (_, i) => start + i);
}

/**
 * Truncates a string if it exceeds maxLength
 */
export function truncateString(str: string, maxLength: number) {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + '...';
}

/**
 * Delay execution for a specified number of milliseconds
 */
export async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Parses a JSON string safely without throwing
 */
export function safeJSONParse<T>(jsonString: string, fallback: T): T {
    try {
        return JSON.parse(jsonString) as T;
    } catch (error) {
        return fallback;
    }
}

/**
 * Creates a unique ID
 */
export function generateUID(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Gets a nested property from an object safely
 */
export function getNestedValue<T>(obj: any, path: string, defaultValue: T): T {
    const keys = path.split('.');
    let result = obj;

    for (const key of keys) {
        if (result === undefined || result === null) {
            return defaultValue;
        }
        result = result[key];
    }

    return (result === undefined || result === null) ? defaultValue : result;
} 