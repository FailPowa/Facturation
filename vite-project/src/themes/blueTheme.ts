import type { ThemeDefinition } from "vuetify";

export const blueTheme: ThemeDefinition = {
    dark: true,
    colors: {
        background: '#09002f',
        surface: '#422ad5',
        'surface-bright': '#120b3d',
        'surface-light': '#09002f',
        primary: '#f861b4',
        secondary: '#71d1fe',
        error: '#ff0301',
        info: '#00bafe',
        success: '#00d3bb',
        warning: '#c14b32'
    },
    variables: {
        'border': '1px',
        'border-color': '#000000',
        'border-opacity': 0.12,
        'high-emphasis-opacity': 0.87,
        'medium-emphasis-opacity': 0.60,
        'disabled-opacity': 0.38,
        'idle-opacity': 0.04,
        'hover-opacity': 0.04,
        'focus-opacity': 0.12,
        'selected-opacity': 0.08,
        'activated-opacity': 0.12,
        'pressed-opacity': 0.12,
        'dragged-opacity': 0.08,
        'theme-kbd': '#212529',
        'theme-on-kbd': '#FFFFFF',
        'theme-code': '#F5F5F5',
        'theme-on-code': '#000000',
        'radius-selector': '0.5rem',
        'radius-field': '0.5rem',
        'radius-box': '1rem',
        'size-selector': '0.21875rem',
        'size-field': '0.21875rem'
    }
}