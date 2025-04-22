<template>
    <v-card max-width="400">
        <v-container fluid>
            <v-row>
                <v-col>
                    <v-card-title>Modifier le TJM</v-card-title>
                </v-col>
            </v-row>
            <v-row>
                <v-card-text>
                    <v-text-field
                        v-model="montant"
                        type="number"
                        label="TJM"
                    />
                </v-card-text>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn 
                        color="success"
                        @click="confirmDialog"
                    >
                        Valider
                    </v-btn>
                </v-col>
                <v-col>
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

    /** Définition d'un paramètre du composant */
    const props = defineProps({
        tjmMontant: {
            type: Number,
            required: true
        }
    });

    /** Définition des événements */
    const emit = defineEmits([
        'cancel',
        'confirm'
    ]);

    /** Variable du champs texte pour modifier le montant */
    const montant: Ref<number> = ref(props.tjmMontant);

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
        emit('confirm', montant.value);
    }
</script>