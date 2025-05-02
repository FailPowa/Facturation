<template>
    <v-layout>
        <v-app-bar 
            color="surface-bright" 
            density="compact"
        >
            <v-app-bar-nav-icon @click="drawer = !drawer" />

            <v-row>
                <v-col 
                    v-for="r in routesList" 
                    :key="r.path"
                >
                    <v-btn 
                        variant="text"
                        :to="r.path"
                    >
                    <template #default>
                        {{ r.label }}
                    </template>
                    <template #append>
                        <v-icon 
                            v-if="icons[r.path].length != 0" 
                            :icon="icons[r.path]" 
                            size="large" 
                        />
                    </template>
                    </v-btn>
                </v-col>
            </v-row>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            right
            scrim
            temporary
            width="500"
            elevation="5"
            sticky
        >
            <MeLayout />
        </v-navigation-drawer>
        <v-main>
            <v-container>
                <v-row>
                    <v-col>
                        <RouterView />
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-layout>
</template>

<script setup lang="ts">
    import { ref, Ref } from 'vue';
    import { routes } from '../router/routes';
    import MeLayout from './components/layout/MeLayout.vue'
    import { mdiHelpCircleOutline, mdiAccountGroupOutline, mdiHomeOutline } from '@mdi/js';

    /** Variable contenant les différentes routes */
    const routesList: Ref<any[]> = ref(routes);

    /** Variable contenant les différentes icones des routes */
    const icons: Ref<Record<string, string>>= ref({
        '/': mdiHomeOutline,
        '/clients': mdiAccountGroupOutline,
        '/help': mdiHelpCircleOutline
    });

    const drawer = ref(false)
</script>