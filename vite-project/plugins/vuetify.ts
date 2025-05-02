import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { darkTheme, greenTheme, retroTheme, lightTheme } from '../src/themes';
import { blueTheme } from '../src/themes/blueTheme';


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
            greenTheme,
            retroTheme,
            lightTheme,
            blueTheme
         }
     }
});

export default vuetify;