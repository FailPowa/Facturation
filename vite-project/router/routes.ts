import ClientLayout from '../src/views/ClientView.vue';
import HelpLayout from '../src/views/HelpView.vue';
import HomeLayout from '../src/views/HomeView.vue';

/** Définition des routes de l'application */
export const routes = [
    {
        path: '/',
        component: HomeLayout,
        label: 'Accueil'
    },
    {
        path: '/form',
        component: ClientLayout,
        label: "Formulaire"
    },
    {
        path: '/help',
        component: HelpLayout,
        label: 'Aide'
    }
];