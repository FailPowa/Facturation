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
                        v-model="datePaiement"
                        :rules="datePaiementRules"
                        validate-on="input"
                        label="Date de paiement"
                        placeholder="JJ/MM/AAAA"
                        variant="outlined"
                        data-testid="add-payment-date-field"
                    ></v-date-input>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="d-flex ga-16 justify-center">
                    <v-btn 
                        color="success"
                        data-testid="confirm-btn"
                        @click="confirmDialog"
                    >
                        Valider
                    </v-btn> 
                    <v-btn 
                        color="error"
                        data-testid="cancel-btn"
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
import { formatDate } from '../../../plugins/dateFormatter';

    /** Paramètres du composant */
    const props = defineProps({
        dateFacture: { type: Date, required: true}
    });

    /** Définition des événements */
    const emit = defineEmits([
        'cancel',
        'confirm'
    ]);

    /** Variable contenant la date de paiement */
    const datePaiement: Ref<Date> = ref(props.dateFacture);

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
        const isValid = datePaiementRules.every(rule => rule(datePaiement.value) === true)
        if (isValid){
            emit('confirm', datePaiement.value);
        }
    };

    /**
     * Règles : 
     *  - La date de paiement ne peut pas être inférieure à la date de la facture
     */
    const datePaiementRules = [
        (value: string | Date) => {
            let date : Date
            if (typeof value === "string"){
                const [day, month, year] = value.split('/').map(Number);
                date = new Date(year, month - 1, day)
            }else{
                date = value
            }
            return (date.getTime() >= props.dateFacture.getTime()) ? true : "La date de paiement est inférieur à la date de la facture"
        }
    ]
</script>