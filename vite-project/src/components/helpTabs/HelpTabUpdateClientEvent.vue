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
                Depuis l'onglet des clients, le bouton suivant <v-icon :icon="icons.mdiPencilOutline" @click="" /> est disponible dans la section <strong>Actions</strong>
                de la table des clients.
            </p>
            <br />
            <p>En cliquant dessus, une fenêtre s'ouvre, permettant de modifier les informations du client.</p>
            <p>Toutes les informations sont modifiables, cependant, comme pour la création de client,</p>
            <p>certaines sont requises à l'enregistrement tel que, son nom, son adresse ou encore son numéro de siret.</p>
            <p class="mt-2 font-weight-medium font-italic">(A noter: Le numéro de siret de La Poste, ne respectant pas l'algorithme de Luhn, rendra la saisie du formulaire de création d'un client invalide.)</p>
            <br />
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
    import { ref, Ref } from 'vue';
    import { 
        mdiAccountGroupOutline,
        mdiListBoxOutline,
        mdiPencilOutline
    } from '@mdi/js';

    const title: Ref<string> = ref('Comment modifier un client ?');
    const icons = ref({
        mdiAccountGroupOutline,
        mdiListBoxOutline,
        mdiPencilOutline
    });
</script>
<style scoped>
.help-text {
    text-align: start;
    margin-left: 5%;
}
</style>