import type { ThemeDefinition } from "vuetify";

export const retroTheme: ThemeDefinition = {
    dark: false,
    colors: {
        background: '#ece3ca',
        surface: '#e4d8b4', 
        'surface-bright': '#dbca9c',
        'surface-light': '#ece3ca', 
        primary: '#ff9fa0',
        secondary: '#b7f6cd',
        accent: '#d08700',
        error: '#ff6266',
        info: '#0082ce',
        success: '#00776f',
        warning: '#f34700'
    },
    variables: {
        'border': '1px',
        'radius-selector': '0.25rem',
        'radius-field': '1rem',
        'radius-box': '0rem',
        'size-selector': '0.25rem',
        'size-field': '0.25rem'
    }
}
  