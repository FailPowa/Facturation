<template>
    <v-card
        flat
        :title="title"
    >
    <v-card-text class="help-text">
        <br />
        <h3>
            <v-icon :icon="icons.mdiMenu" size="large" />
            Mettre à jour les informations de votre entreprise
        </h3>
        <br />
        <p>
            Pour accéder aux informations de votre entreprise, ouvrez le <strong>menu latéral</strong> (navigation drawer)
            en cliquant sur le <strong>menu hamburger</strong> situé tout à gauche de la barre de navigation en haut de l'application.
        </p>
        <p>
            En bas à gauche de ce menu, vous trouverez un bouton suivant permettant de modifier les informations.
        </p>
        <v-btn 
            color="primary" 
            class="mb-2 ma-2" 
            icon 
            @click=""
        >
            <v-icon 
                :icon="icons.mdiPencil" 
                size="large" 
            />        
        </v-btn> 
        <p>
            En cliquant dessus, une fenêtre s'ouvre avec les informations actuelles de votre entreprise. 
            Vous pouvez alors les mettre à jour selon vos besoins.
        </p>
        <p>
            Cette modification fonctionne de manière similaire à la mise à jour d'un client : 
            les champs sont pré-remplis et vous pouvez les modifier avant de valider.
        </p>
        <br />
    </v-card-text>

    </v-card>
</template>
<script setup lang="ts">
    import { ref, Ref } from 'vue';
    import { 
        mdiMenu,
        mdiListBoxOutline,
        mdiPencilOutline,
        mdiPencil
    } from '@mdi/js';

    const title: Ref<string> = ref('Comment accéder et mettre à jour les informations de votre entreprise ?');
    const icons = ref({
        mdiMenu,
        mdiListBoxOutline,
        mdiPencilOutline,
        mdiPencil
    });
</script>
<style scoped>
.help-text {
    text-align: start;
    margin-left: 5%;
}
</style>