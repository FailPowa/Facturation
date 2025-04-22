import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from './routes';

/** Constructeur du router */
export const router = createRouter({
    history: createMemoryHistory(),
    routes
});