<template>
    <v-container>
        <v-list dense>
            <v-list-item>
                <v-list-item-title class="text-h6">{{ monEntreprise.nom }}</v-list-item-title>
            </v-list-item>

            <v-list-item>
                <v-list-item-subtitle>{{ monEntreprise.adresse }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
                <v-list-item-subtitle>{{ monEntreprise.codePostal }} {{ monEntreprise.ville }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
                <v-list-item-subtitle>Email : {{ monEntreprise.mail }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
                <v-list-item-subtitle>SIRET : {{ monEntreprise.siret }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
                <v-list-item-subtitle>TVA : {{ monEntreprise.numTva }}</v-list-item-subtitle>
            </v-list-item>
        </v-list>
    </v-container>
</template>


<script setup lang="ts">
    import { Entreprise } from '../../../types';
    import { onUpdated, ref, Ref } from 'vue';

    /** Paramètres du composant */
    const props = defineProps({
        entreprise: {
            type: Entreprise,
            required: true
        }
    })
    /** Variable contenant l'entreprise récupéré en paramètre */
    const monEntreprise : Ref<Entreprise> = ref({
        id: -1,
        nom: "",
        adresse: "",
        codePostal: "",
        ville: "",
        mail: "",
        numTva: "",
        siret: "",
        isMe: true
    } as Entreprise)
    
    onUpdated(() => {
        monEntreprise.value = props.entreprise
    })
</script>