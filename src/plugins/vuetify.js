// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                dark: false,
                colors: {
                    // Core
                    primary: '#E44C8B',      // Rose pink
                    secondary: '#F2A1C7',    // Soft blush
                    accent: '#D81B60',       // Strong accent

                    // UI surfaces
                    background: '#FFF7FA',   // Very light pink-white
                    surface: '#FFFFFF',

                    // States
                    error: '#E53935',
                    info: '#4A90E2',
                    success: '#43A047',
                    warning: '#FB8C00',

                    // Text helpers (optional but nice)
                    'on-background': '#1F1F1F',
                    'on-surface': '#1F1F1F',
                },
            },

            dark: {
                dark: true,
                colors: {
                    // Core
                    primary: '#F48FB1',      // Soft rose (easy on eyes)
                    secondary: '#AD1457',    // Deep wine
                    accent: '#FF5C8D',       // Vibrant pink accent

                    // UI surfaces
                    background: '#141114',   // Warm near-black
                    surface: '#1E1A1E',

                    // States
                    error: '#EF5350',
                    info: '#64B5F6',
                    success: '#66BB6A',
                    warning: '#FFB74D',

                    // Text helpers
                    'on-background': '#F5E9EF',
                    'on-surface': '#F5E9EF',
                },
            },
        },
    },
})
