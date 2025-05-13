<template>
    <v-window 
        v-model="windowPart" 
        class="fill-height"
    >
        <v-window-item 
            :value="1" 
            class="fill-height"
        >
            <v-container class="d-flex flex-column justify-space-between fill-height pa-4"> 
                <p class="text-h3">Mon entreprise</p>
                
                <!-- Infos entreprise -->
                <monEntrepriseDetails :entreprise="monEntreprise" />

                <!-- TJM -->
                <TjmLayout scrollable/>
                
                <!-- Boutons -->
                <v-container class="mt-auto d-flex justify-center ga-16 ">
                    <v-btn 
                        color="primary" 
                        class="mb-2" 
                        icon 
                        @click="updateDialog = true"
                    >
                        <v-icon 
                            :icon="mdiPencil" 
                            size="large" 
                        />        
                    </v-btn>
                    <v-btn 
                        color="secondary" 
                        icon 
                        @click="windowPart = 2"
                    >
                        <v-icon 
                            :icon="mdiCog" 
                            size="large" 
                        /> 
                    </v-btn>
                </v-container>
            </v-container>
        </v-window-item>
        
        <v-window-item 
            :value="2" 
            class="fill-height"
        >
            <v-container class="d-flex flex-column justify-space-between fill-height pa-4">
                <v-container>
                    <p class="text-h4">Paramètres</p>
                </v-container>
                
                <!-- Paramètres des thèmes -->
                <v-container>
                    <SettingThemes />
                </v-container>
                <!-- Bouton retour à la page précédente-->
                <v-container class="mt-auto d-flex justify-center ga-16 ">
                    <v-btn 
                        color="primary" 
                        class="mb-2" 
                        icon 
                        @click="windowPart=1"
                    >
                        <v-icon 
                            :icon="mdiArrowULeftBottom" 
                            size="large" 
                        />        
                    </v-btn>
                </v-container>
            </v-container>
            
        </v-window-item>
        
    </v-window>
    
    <!-- Boite de dialogue contenant le formulaire de modification de votre entreprise -->
    <v-dialog
        v-model="updateDialog"
        width="75%"
        persistent
    >
        <EntrepriseForm
            :formTitle="'Modifier mes informations'"
            :entreprise="updatingMonEntreprise"
            @cancel="updateDialog = false"
            @confirm="updateMonEntreprise"
        />
    </v-dialog>
</template>

<script setup lang="ts">
    import { onMounted, ref, Ref } from 'vue';
    import EntrepriseForm from '../forms/EntrepriseForm.vue';
    import SettingThemes from '../settings/SettingThemes.vue';
    import monEntrepriseDetails from '../details/monEntrepriseDetails.vue';
    import TjmLayout from '../layout/TjmLayout.vue';
    import { EntrepriseType } from '../../../types';
    import { 
        mdiPencil, 
        mdiCog, 
        mdiArrowULeftBottom  
    } from '@mdi/js';

    /** Variable contenant les informations de votre entreprise */
    const monEntreprise: Ref<EntrepriseType> = ref({} as EntrepriseType);
    
    /** Variable contenant les informations de votre entreprise à mettre à jour */
    const updatingMonEntreprise: Ref<EntrepriseType> = ref({} as EntrepriseType);
    
    /** Variable contenant le boolean pour ouvrir/fermer la boite de dialogue pour mettre à jour l'entreprise*/
    const updateDialog: Ref<boolean> = ref(false);
    
    /** Variable contenant la partie à afficher pour le composant window : { 1: MonEntreprise, 2: Paramètres } */
    const windowPart = ref(1)
    
    onMounted(async () => {
        await getMonEntreprise();
    })

    /** Récupère votre entreprise */
    async function getMonEntreprise() {
        const result = await window.serviceElectron.getMonEntreprise();
        monEntreprise.value = Object.assign({}, result)
        updatingMonEntreprise.value = Object.assign({}, result)
    }

    /** Met à jour les informations de votre entreprise */
    async function updateMonEntreprise() {
        const updatedMonEntreprise = Object.assign({}, updatingMonEntreprise.value)
        await window.serviceElectron.updateClient(updatedMonEntreprise)
        getMonEntreprise()
        updateDialog.value = false
    }
</script>