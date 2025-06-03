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
                Dans l'onglet Factures, le bouton 
                <v-icon :icon="icons.mdiDeleteOutline" color="error" @click="" /> 
                est disponible dans la section <strong>Actions</strong> du tableau.
            </p>
            <p>
                En cliquant dessus, une fenêtre s’ouvre pour confirmer la suppression de la facture.
            </p>
            <p class="mt-2 font-weight-medium font-italic">
                (À noter : une facture dont le statut est "payée" ne peut pas être supprimée.)
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
                Depuis la page d'Accueil, un bouton identique est dans la sections <strong>Actions</strong> du tableau des factures.
            </p>
            <p>
                Comme dans l’onglet Factures, cliquer dessus ouvre une fenêtre de confirmation de suppression.
            </p>
            <p class="mt-2 font-weight-medium font-italic">
                (À noter : une facture dont le statut est "payée" ne peut pas être supprimée.)
            </p>
            <br />
        </v-card-text>

    </v-card>
</template>
<script setup lang="ts">
    import { ref, Ref } from 'vue';
    import { 
        mdiInvoiceMultipleOutline,
        mdiDeleteOutline,
        mdiHomeOutline
        
    } from '@mdi/js';

    const title: Ref<string> = ref('Comment supprimer une facture ?');
    const icons = ref({
        mdiInvoiceMultipleOutline,
        mdiDeleteOutline,
        mdiHomeOutline
    });
</script>
<style scoped>
.help-text {
    text-align: start;
    margin-left: 5%;
}
</style>