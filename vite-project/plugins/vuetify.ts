import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { darkTheme, blueTheme } from '../src/themes';

const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    },
    theme: {
        defaultTheme: 'darkTheme',
        themes: {
            darkTheme,
            blueTheme
        }
    }
});

export default vuetify;