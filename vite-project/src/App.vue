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
            width="500"
            elevation="5"
            right
            scrim
            temporary
            sticky
        >
            <MyEntrepriseLayout />
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
        
        <v-overlay
            :model-value="uiStore.loading"
            class="align-center justify-center"
            persistent
        >
            <v-progress-circular
                color="primary"
                size="64"
                indeterminate
            ></v-progress-circular>
        </v-overlay>

        <div class="custom-alert">
            <transition 
                leave-active-class="animate__animated animate__fadeOutDown">
                <AlertDialog
                    v-model="uiStore.popupVisible"
                    :intent="uiStore.alertType"
                    :duration="5"
                    class="animate__animated animate__fadeInDown "
                >
                    <p class="text-h6 text-left">{{ uiStore.message }}</p>
                </AlertDialog>
            </transition>
        </div>
    </v-layout>
</template>

<script setup lang="ts">
    import { onMounted, onUpdated, ref, Ref } from 'vue';
    import { routes } from '../router/routes';
    import MyEntrepriseLayout from './components/layout/MyEntrepriseLayout.vue';
    import AlertDialog from './components/dialogs/AlertDialog.vue';
    import { 
        mdiHelpCircleOutline, 
        mdiAccountGroupOutline, 
        mdiHomeOutline,
        mdiInvoiceMultipleOutline
    } from '@mdi/js';
    import { useMonEntreprise } from './stores/monEntreprise';
    import { useUiStore } from './stores/ui';
    
    /** Stores */
    const entrepriseStore = useMonEntreprise();
    const uiStore = useUiStore();

    /** Variable contenant les différentes routes */
    const routesList: Ref<any[]> = ref(routes);

    /** Variable contenant les différentes icones des routes */
    const icons: Ref<Record<string, string>>= ref({
        '/': mdiHomeOutline,
        '/clients': mdiAccountGroupOutline,
        '/factures': mdiInvoiceMultipleOutline,
        '/help': mdiHelpCircleOutline
    });

    /** Variable contenant le boolean permettant d'ouvrir/fermer
     *  la fenêtre pour afficher les informations sur votre entreprise 
     */
    const drawer = ref(false)

    /**
     * Met à jour les informations de votre entreprise lors du montage
     */
    onMounted(async () => {
        await entrepriseStore.update();
    })

    /**
     * Met à jour à chaque fois que les sous-composants du composant racine change ?
     */
    onUpdated(async () => {
        await entrepriseStore.update();
    })
</script>


<style scoped>
.custom-alert {
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
}
</style>
