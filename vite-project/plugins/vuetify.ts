import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { VDateInput } from 'vuetify/labs/VDateInput';
import { fr } from 'vuetify/locale';
import { darkTheme, greenTheme, retroTheme, lightTheme, blueTheme } from '../src/themes';



const vuetify = createVuetify({
    ssr: true,
    components: {
        ...components,
        VDateInput
    },
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    },
    locale: {
        locale: 'fr',
        messages: { fr }
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