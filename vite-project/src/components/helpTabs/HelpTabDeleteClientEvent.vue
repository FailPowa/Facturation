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
                Depuis l'onglet des clients, le bouton suivant <v-icon :icon="icons.mdiDeleteOutline" @click="" /> est disponible dans la section <strong>Actions</strong>
                de la table des clients.
            </p>
            <br />
            <p>En cliquant dessus, une fenêtre s'ouvre, demandant la confirmation de la suppression du client.</p>
            <p>Vous pouvez annuler l'action en cliquant sur le bouton Annuler.</p>
            <br />
            <p>Cependant, si le client est lié à une ou plusieurs factures, la suppression ne pourra s'effectuer seulement si les factures ont été retirées.</p>
            <br />
            <p class="mt-2 font-weight-medium font-italic">A noter: Si vous supprimer les factures liées au client, n'oubliez d'effectuer une sauvegarde en exportant en json les factures ou en exportant les factures au format PDF (Voire les sections d'aide suivant pour plus d'informations: ...)</p>
            <br />
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
    import { ref, Ref } from 'vue';
    import { 
        mdiAccountGroupOutline,
        mdiDeleteOutline
        
    } from '@mdi/js';

    const title: Ref<string> = ref('Comment supprimer un client ?');
    const icons = ref({
        mdiAccountGroupOutline,
        mdiDeleteOutline
    });
</script>
<style scoped>
.help-text {
    text-align: start;
    margin-left: 5%;
}
</style>