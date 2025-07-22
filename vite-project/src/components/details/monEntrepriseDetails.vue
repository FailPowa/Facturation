<template>
    <v-container>
        <v-list dense>
            <v-list-item>
                <v-list-item-title class="text-h6" id="nom">{{ props.entreprise.nom }}</v-list-item-title>
            </v-list-item>

            <v-list-item>
                <v-list-item-subtitle id="adresse">{{ props.entreprise.adresse }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
                <v-list-item-subtitle id="cp-ville">{{ props.entreprise.codePostal }} {{ props.entreprise.ville }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
                <v-list-item-subtitle id="email">Email : {{ props.entreprise.mail }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
                <v-list-item-subtitle id="siret">SIRET : {{ props.entreprise.siret.length !== 0 ? siretFormatter(props.entreprise.siret) : ""}}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
                <v-list-item-subtitle id="tva">TVA : {{ props.entreprise.numTva ? numTvaFormatter(props.entreprise.numTva) : ""}}</v-list-item-subtitle>
            </v-list-item>
        </v-list>
    </v-container>
</template>


<script setup lang="ts">
    import { Entreprise } from '../../../types';
    import { siretFormatter, numTvaFormatter } from '../../../plugins/entrepriseFormatter';

    /** Paramètres du composant */
    const props = defineProps({
        entreprise: {
            type: Entreprise,
            required: true
        }
    })
</script>