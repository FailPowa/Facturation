import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import vuetify from '../plugins/vuetify';
import { router } from '../router';

createApp(App, {
    compilerOptions: {
        isCustomElement: (tag: string) => tag.startsWith('v-')
    }
})
.use(router)
.use(vuetify)
.mount('#app');
