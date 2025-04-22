<template>
    <v-layout>
        <v-app-bar 
            color="secondary" 
            density="compact"
        >
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
                            v-if="r.path === '/help'" 
                            :icon="icons.mdiHelpCircleOutline" 
                            size="large" 
                        />
                    </template>
                    </v-btn>
                </v-col>
            </v-row>
        </v-app-bar>
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
    import { mdiHelpCircleOutline } from '@mdi/js';

    const routesList: Ref<any[]> = ref(routes);
    const icons = ref({
        mdiHelpCircleOutline
    });
</script>