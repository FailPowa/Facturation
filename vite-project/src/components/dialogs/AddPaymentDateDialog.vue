<template>
    <v-card width="auto" height="auto">
        <v-container fluid>
            <v-row>
                <v-col offset="0" cols="12">
                    <v-card-title 
                        class="text-h6 text-center"
                    >
                        Ajouter la date de paiement
                    </v-card-title>
                </v-col>
            </v-row>
            <v-row>
                <v-col offset="0" cols="12">
                    <v-date-input 
                        label="Date de paiement" 
                        variant="outlined"
                    ></v-date-input>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="d-flex ga-16 justify-center">
                    <v-btn 
                        color="success"
                        @click="confirmDialog"
                    >
                        Valider
                    </v-btn> 
                    <v-btn 
                        color="error"
                        @click="exitDialog"
                    >
                        Annuler
                    </v-btn>
                </v-col>

            </v-row>
        </v-container>
    </v-card>
</template>

<script setup lang="ts">
    import { Ref, ref } from 'vue';
    import { FullFacture } from '../../../types';

    /** Paramètres du composant */
    const props = defineProps({
        facture: { type: [FullFacture, null], required: true}
    });

    if (props.facture === null){
        exitDialog();
    }

    /** Définition des événements */
    const emit = defineEmits([
        'cancel',
        'confirm'
    ]);

    /** Variable contenant la date de paiement */
    const datePaiement: Ref<Date> = ref(new Date(Date.now()));

    /**
     * Clic sur le bouton Annuler
     */
    function exitDialog(): void {
        emit('cancel');
    };

    /**
     * Clic sur le bouton Valider
     */
    function confirmDialog(): void {
        emit('confirm', datePaiement.value);
    };
</script>