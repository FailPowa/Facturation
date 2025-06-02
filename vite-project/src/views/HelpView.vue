<template>
    <v-row>
        <v-col cols="4">
            
            <v-tabs
                v-model="activeTab"
                color="primary"
                direction="vertical"
            >
                <v-tab 
                    v-for="t in tabs"
                    :key="t.value"
                    :text="t.text"
                    :value="t.value"
                    class="animate__animated animate__backInLeft"
                />
            </v-tabs>
        </v-col>
        <v-col cols="8">
            <v-tabs-window v-model="activeTab">
                <v-tabs-window-item 
                    v-for="t in tabs"
                    :key="t.value"
                    :value="t.value"
                    class="animate__animated animate__fadeIn"
                >
                    <component :is="t.component" />
                </v-tabs-window-item>
            </v-tabs-window>
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
    import { ref, Ref, shallowRef } from 'vue';
    import {
        // Client
        HelpTabAddClientEvent,
        HelpTabUpdateClientEvent,
        HelpTabDeleteClientEvent,
        HelpTabExportImportEvent,

        // Factures
        HelpTabAddFactureEvent,
        HelpTabUpdateFactureEvent,
        HelpTabDeleteFactureEvent,
        HelpTabUpdateFactureStatutEvent,
        HelpTabExportFacturesPDFEvent,

        // Votre entreprise
        HelpTabUpdateMonEntrepriseEvent,
        HelpTabUpdateTjmEvent,

        // Exports/Imports
        HelpTabExportImportClientsEvent,
        HelpTabExportImportFacturesEvent,
    } from '../components/helpTabs';

    const tabs = shallowRef([
        // Aide - Clients
        {
            text: 'Comment ajouter un client ?',
            value: 'add-client-event',
            component: HelpTabAddClientEvent
        },
        {
            text: 'Comment modifier un client ?',
            value: 'update-client-event',
            component: HelpTabUpdateClientEvent
        },
        {
            text: 'Comment supprimer un client ?',
            value: 'delete-client-event',
            component: HelpTabDeleteClientEvent
        },
        // Aide - Factures
        {
            text: 'Comment ajouter une facture ?',
            value: 'add-facture-event',
            component: HelpTabAddFactureEvent
        },
        {
            text: 'Comment modifier une facture ?',
            value: 'update-facture-event',
            component: HelpTabUpdateFactureEvent
        },
        {
            text: 'Comment supprimer une facture ?',
            value: 'delete-facture-event',
            component: HelpTabDeleteFactureEvent
        },
        {
            text: "Comment mettre à jour le statut  d'une facture ?",
            value: 'update-facture-statut-event',
            component: HelpTabUpdateFactureStatutEvent
        },
        {
            text: 'Comment exporter ma facture en pdf ?',
            value: 'export-facture-pdf-event',
            component: HelpTabExportFacturesPDFEvent
        },
        // Aide - Mon entreprise
        {
            text: 'Comment mettre à jour les informations de votre entreprise ?',
            value: 'update-my-entreprise-event',
            component: HelpTabUpdateMonEntrepriseEvent
        },
        {
            text: 'Comment mettre à jour mon taux journalier moyen (TJM) ?',
            value: 'update-tjm-event',
            component: HelpTabUpdateTjmEvent
        },
        // Aide - Imports/Exports de données
        {
            text: 'Comment sauvegarder les clients enregistrés ?',
            value: 'update-tjm-event',
            component: HelpTabExportImportClientsEvent
        },
        {
            text: 'Comment sauvegarder mes factures ?',
            value: 'update-tjm-event',
            component: HelpTabExportImportFacturesEvent
        },
        {
            text: 'Comment échanger mon travail avec mes collègues ?',
            value: 'export-import-event',
            component: HelpTabExportImportEvent
        }
    ]);
    const activeTab: Ref<string> = ref('add-event');
</script>