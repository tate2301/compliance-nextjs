/**
 * Mercury Design System Color Tokens
 * Based on Radix UI Colors (https://www.radix-ui.com/colors)
 */

import {
    sand,
    sandDark,
    sandA,
    sandDarkA,
    indigo,
    indigoDark,
    indigoA,
    indigoDarkA,
    blue,
    blueDark,
    blueA,
    blueDarkA,
    red,
    redDark,
    redA,
    redDarkA,
    amber,
    amberDark,
    amberA,
    amberDarkA,
    green,
    greenDark,
    greenA,
    greenDarkA,
} from '@radix-ui/colors'

function createColorScale(scale: Record<string, string>, alphaScale: Record<string, string>) {
    const solidColors = Object.entries(scale).reduce((acc, [key, value]) => {
        const number = key.replace(/[A-Za-z]/g, '')
        return {
            ...acc,
            [number]: value
        }
    }, {})

    const alphaColors = Object.entries(alphaScale).reduce((acc, [key, value]) => {
        const number = key.replace(/[A-Za-z]/g, '')
        return {
            ...acc,
            [`a${number}`]: value
        }
    }, {})

    return {
        ...solidColors,
        ...alphaColors
    }
}

export const colors = {
    sand: createColorScale(sand, sandA),
    primary: createColorScale(indigo, indigoA),
    secondary: createColorScale(blue, blueA),
    error: createColorScale(red, redA),
    warning: createColorScale(amber, amberA),
    success: createColorScale(green, greenA),
}

// Dark mode colors
export const darkColors = {
    sand: createColorScale(sandDark, sandDarkA),
    primary: createColorScale(indigoDark, indigoDarkA),
    secondary: createColorScale(blueDark, blueDarkA),
    error: createColorScale(redDark, redDarkA),
    warning: createColorScale(amberDark, amberDarkA),
    success: createColorScale(greenDark, greenDarkA),
}

/**
 * Mercury Design System Spacing Scale
 * Based on a 4px grid system
 */
export const spacing = {
    0: '0px',
    0.5: '2px',
    1: '4px',
    1.5: '6px',
    2: '8px',
    2.5: '10px',
    3: '12px',
    3.5: '14px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    11: '44px',
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    24: '96px',
    28: '112px',
    32: '128px',
    36: '144px',
    40: '160px',
}

/**
 * Mercury Design System Elevation (Shadow) Scale
 */
export const elevation = {
    0: 'none',
    1: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    2: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
    3: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
    4: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
    5: '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
    6: '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
    focus: '0px 0px 0px 2px hsl(206 100% 50%)',
}

/**
 * Mercury Design System Border Radius Scale
 */
export const radii = {
    none: '0',
    sm: '0.125rem',  // 2px
    md: '0.25rem',   // 4px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    '3xl': '1.5rem', // 24px
    full: '9999px',
}

export default colors; 