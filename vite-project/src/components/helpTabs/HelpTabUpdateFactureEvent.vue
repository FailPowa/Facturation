<template>
    <v-card
        flat
        :title="title"
    >
        <v-card-text class="help-text">
            <br />
            <h3>
                <v-icon :icon="icons.mdiInvoiceMultipleOutline" />
                Depuis l'onglet Factures
            </h3>
            <br />
            <p>
                Dans la section <strong>Actions</strong> de la table des factures, un bouton 
                <v-icon :icon="icons.mdiPencilOutline" @click="" /> permet de modifier une facture.
            </p>
            <p>
                En cliquant dessus, une fenêtre s'ouvre pour saisir ou modifier les informations de la facture.
                Certaines informations sont obligatoires : date de facturation, nombre de jours travaillés, nom du client, etc.
            </p>
            <br />
            <v-divider />
            <br />
            <h3>
                <v-icon :icon="icons.mdiHomeOutline" />
                Depuis la page d'Accueil
            </h3>
            <br />
            <p>
                Le même bouton est disponible en haut à gauche du tableau des factures.
                Il permet également d'ouvrir la fenêtre de saisie des informations, comme dans l'onglet Factures.
            </p>
            <p>
                Les champs requis sont identiques : date de facturation, nombre de jours travaillés, nom du client, etc.
            </p>
            <br />
        </v-card-text>

    </v-card>
</template>
<script setup lang="ts">
    import { ref, Ref } from 'vue';
    import { 
        mdiInvoiceMultipleOutline,
        mdiPencilOutline,
        mdiHomeOutline
        
    } from '@mdi/js';

    const title: Ref<string> = ref('Comment modifier une facture ?');
    const icons = ref({
        mdiInvoiceMultipleOutline,
        mdiPencilOutline,
        mdiHomeOutline
    });
</script>
<style scoped>
.help-text {
    text-align: start;
    margin-left: 5%;
}
</style>