<template>
    <v-card width="auto" height="auto">
        <v-container fluid>
            <v-row>
                <v-col offset="0" cols="12">
                    <v-card-title
                        class="text-h6 text-center"
                    >
                        {{ title }}
                    </v-card-title>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="d-flex ga-16 justify-center">
                    <v-btn
                        id="confirm-btn"
                        color="success"
                        @click="confirmDialog"
                    >
                        Valider
                    </v-btn> 
                    <v-btn 
                        id="cancel-btn"
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

    /** Définition d'un paramètre du composant */
    const props = defineProps({
        questionTitle: {
            type: String,
            required: true
        }
    });

    /** Définition des événements */
    const emit = defineEmits([
        'cancel',
        'confirm'
    ]);

    /** Variable du champs texte pour modifier le montant */
    const title: Ref<string> = ref(props.questionTitle);

    /**
     * Clic sur le bouton Annuler
     */
    function exitDialog(): void {
        emit('cancel');
    }

    /**
     * Clic sur le bouton Valider
     */
    function confirmDialog(): void {
        emit('confirm');
    }
</script>