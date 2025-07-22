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
        error: '#D32F2F',
        info: '#0288D1',
        success: '#388E3C',
        warning: '#F57C00'
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
  