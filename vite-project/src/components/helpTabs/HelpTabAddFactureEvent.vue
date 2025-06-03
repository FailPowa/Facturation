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
                Dans l'onglet Factures, le bouton suivant est disponible en haut à droite du tableau :
            </p>
            <!-- Bouton ajouter une facture -->
            <v-btn class="d-flex align-self-end ma-4" color="success">
                <b class="me-2">Ajouter une facture</b>
                <v-icon variant="outlined" color="primary">
                    {{ icons.mdiReceiptTextPlusOutline }}
                </v-icon>
            </v-btn>
            <p>
                En cliquant dessus, une fenêtre s'ouvre pour saisir les informations de la facture.
                Certaines données sont obligatoires : date de facturation, nombre de jours travaillés, nom du client, etc.
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
                Depuis la page d'Accueil, un bouton similaire se trouve en haut à gauche du tableau des factures.
                Il permet également d'ouvrir la fenêtre de saisie des informations, comme dans l'onglet Factures.
            </p>
            <p>
                Les mêmes champs obligatoires sont requis : date de facturation, nombre de jours travaillés, nom du client, etc.
            </p>
            <br />
        </v-card-text>

    </v-card>
</template>
<script setup lang="ts">
    import { ref, Ref } from 'vue';
    import { 
        mdiInvoiceMultipleOutline,
        mdiReceiptTextPlusOutline,
        mdiHomeOutline
        
    } from '@mdi/js';

    const title: Ref<string> = ref('Comment ajouter une facture ?');
    const icons = ref({
        mdiInvoiceMultipleOutline,
        mdiReceiptTextPlusOutline,
        mdiHomeOutline
    });
</script>
<style scoped>
.help-text {
    text-align: start;
    margin-left: 5%;
}
</style>