import type { ThemeDefinition } from "vuetify";

export const lightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        background: '#f9f9f9',
        surface: '#f4f4f4',
        'surface-bright': '#eae9ea',
        'surface-light': '#f9f9f9',
        primary: '#9ea2bc',
        secondary: '#000000',
        accent: '#9e8baa',
        error: '#917d6d',
        info: '#858b99',
        success: '#82a388',
        warning: '#a8a78a'
    },
    variables: {
        'border': '1px',
        'radius-selector': '1rem',
        'radius-field': '0.25rem',
        'radius-box': '1rem',
        'size-selector': '0.25rem',
        'size-field': '0.25rem',
        'primary-content': '#454549',
        'secondary-content': '#ffffff',
        'accent-content': '#3d3a3f',
        'error-content': '#f7f5f4',
        'info-content': '#f5f8f9',
        'success-content': '#f2f9f2',
        'warning-content': '#f6f9f4',
        'base-content': '#454549',
        'neutral': '#444444',
        'neutral-content': '#f9f9f9',
        'depth': '1',
        'noise': '0'
    }
}
  