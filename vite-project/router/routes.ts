import FactureLayout from '../src/components/layout/FactureLayout.vue';
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
        path: '/clients',
        component: ClientLayout,
        label: "Clients"
    },
    {
        path: '/factures',
        component: FactureLayout,
        label: "Factures"
    },
    {
        path: '/help',
        component: HelpLayout,
        label: 'Aide'
    }
];