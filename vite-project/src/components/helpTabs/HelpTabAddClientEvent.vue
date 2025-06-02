<template>
    <v-card
        flat
        :title="title"
    >
        <v-card-text class="help-text">
            <br />
            <h3>
                <v-icon :icon="icons.mdiAccountGroupOutline" />
                Depuis l'onglet Clients
            </h3>
            <br />
            <p>
                Depuis l'onglet des clients, le bouton suivant est disponible au dessus à droite de la table des clients :
            </p>
            <!-- Bouton ajouter nouveau client-->
            <v-btn
                class="d-flex align-self-end ma-4"
                color="success"
            >
                <b class="me-2">Ajouter un client</b>
                <v-icon
                    variant="outlined"
                    color="primary"
                >
                    {{ mdiAccountPlus }}
                </v-icon>
            </v-btn>
            <br />
            <p>En cliquant dessus, une fenêtre s'ouvre, permettant de saisir les informations du client à ajouter</p>
            <p>Certaines informations sont requises pour la création d'un client tel que, son nom, son adresse, son numéro de siret, etc...</p>
            <p class="mt-2 font-weight-medium font-italic">(A noter: Le numéro de siret de La Poste, ne respectant pas l'algorithme de Luhn, rendra la saisie du formulaire de création d'un client invalide.)</p>
            <br />
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
    import { ref, Ref } from 'vue';
    import { 
        mdiAccountGroupOutline,
        mdiAccountPlus
        
    } from '@mdi/js';

    const title: Ref<string> = ref('Comment ajouter un client ?');
    const icons = ref({
        mdiAccountGroupOutline,
        mdiAccountPlus
    });
</script>
<style scoped>
.help-text {
    text-align: start;
    margin-left: 5%;
}
</style>