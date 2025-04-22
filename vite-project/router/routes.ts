import HelpLayout from '../src/views/HelpLayout.vue';
import HomeLayout from '../src/views/HomeLayout.vue';

/** Définition des routes de l'application */
export const routes = [
    {
        path: '/',
        component: HomeLayout,
        label: 'Accueil'
    },
    {
        path: '/help',
        component: HelpLayout,
        label: 'Aide'
    }
];