import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import vuetify from '../plugins/vuetify';
import { router } from '../router';
import { createPinia } from 'pinia';

const pinia = createPinia();

createApp(App, {
    compilerOptions: {
        isCustomElement: (tag: string) => tag.startsWith('v-')
    }
})
.use(router)
.use(vuetify)
.use(pinia)
.mount('#app');