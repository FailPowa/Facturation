import type { ThemeDefinition } from "vuetify";

export const darkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        background: '#101828',
        surface: '#f7f8fa',
        'surface-bright': '#f1f2f4',
        'surface-light': '#e2e5e9',
        primary: '#d6d6d6',
        secondary: '#3a3a3a',
        error: '#ff0301',
        info: '#0000ff',
        success: '#028002',
        warning: '#ffff00'
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
        'size-field': '0.21875rem',
        'depth': 1,
        'noise': 1
    }
}