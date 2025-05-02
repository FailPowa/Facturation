<template>
    <v-window v-model="windowPart" class="fill-height">
        <v-window-item :value="1" class="fill-height">
            <v-container class="d-flex flex-column justify-space-between fill-height pa-4"> 
                <p class="text-h3">Mon entreprise</p>
                
                <!-- Infos entreprise -->
                <monEntrepriseDetails :entreprise="monEntreprise" />
                
                <!-- Boutons -->
                <v-container class="mt-auto d-flex justify-center ga-16 ">
                    <v-btn color="primary" class="mb-2" icon @click="updateDialog = true">
                        <v-icon 
                            :icon="mdiPencil" 
                            size="large" 
                        />        
                    </v-btn>
                    <v-btn color="secondary" icon @click="windowPart = 2">
                        <v-icon 
                            :icon="mdiCog" 
                            size="large" 
                        /> 
                    </v-btn>
                </v-container>
            </v-container>
        </v-window-item>
        
        <v-window-item :value="2" class="fill-height">
            <v-container class="d-flex flex-column justify-space-between fill-height pa-4">
                <v-container>
                    <p class="text-h4">Paramètres</p>
                </v-container>
                <v-container>
                    <SettingThemes />
                </v-container>
                <v-container class="mt-auto d-flex justify-center ga-16 ">
                    <v-btn color="primary" class="mb-2" icon @click="windowPart=1">
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
            @cancel="updateDialog = false"
            @confirm="updateMonEntreprise"
            :formTitle="'Modifier client'"
            :entreprise="updatingMonEntreprise"
        />
    </v-dialog>
</template>

<script setup lang="ts">
    import { onMounted, ref, Ref } from 'vue';
    import EntrepriseForm from '../forms/EntrepriseForm.vue';
    import SettingThemes from '../settings/SettingThemes.vue';
    import monEntrepriseDetails from '../details/monEntrepriseDetails.vue';
    import { EntrepriseType } from '../../../types/EntrepriseType';
    import { mdiPencil, mdiCog, mdiArrowULeftBottom  } from '@mdi/js';


    const monEntreprise: Ref<EntrepriseType> = ref({} as EntrepriseType);
    const updatingMonEntreprise: Ref<EntrepriseType> = ref({} as EntrepriseType);
    const updateDialog: Ref<boolean> = ref(false);
    
    /** Variable contenant la partie à afficher pour le composant window : { 1: MonEntreprise, 2: Paramètres } */
    const windowPart = ref(1)
    
    onMounted(async () => {
        await getMonEntreprise();
    })

    async function getMonEntreprise() {
        const result = await window.serviceElectron.getMonEntreprise();
        monEntreprise.value = Object.assign({}, result)
        updatingMonEntreprise.value = Object.assign({}, result)
    }

    async function updateMonEntreprise() {
        const updatedMonEntreprise = Object.assign({}, updatingMonEntreprise.value)
        await window.serviceElectron.updateMonEntreprise(updatedMonEntreprise)
        getMonEntreprise()
    }
</script>