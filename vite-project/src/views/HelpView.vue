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
        HelpTabAddEvent,
        HelpTabUpdateEvent,
        HelpTabDeleteEvent,
        HelpTabUpdateDurationEvent,
        HelpTabUpdateTrancheEvent,
        HelpTabUpdateStatutEvent,
        HelpTabFilterEvent,
        HelpTabExportImportEvent
    } from '../components/helpTabs';

    const tabs = shallowRef([
        {
            text: 'Comment ajouter une tâche ?',
            value: 'add-event',
            component: HelpTabAddEvent
        },
        {
            text: 'Comment modifier une tâche ?',
            value: 'update-event',
            component: HelpTabUpdateEvent
        },
        {
            text: 'Comment modifier la durée d\'une tâche ?',
            value: 'update-duration-event',
            component: HelpTabUpdateDurationEvent
        },
        {
            text: 'Comment modifier la tranche concernée d\'une tâche ?',
            value: 'update-tranche-event',
            component: HelpTabUpdateTrancheEvent
        },
        {
            text: 'Comment modifier le statut d\'une tâche ?',
            value: 'update-statut-event',
            component: HelpTabUpdateStatutEvent
        },
        {
            text: 'Comment supprimer une tâche ?',
            value: 'delete-event',
            component: HelpTabDeleteEvent
        },
        {
            text: 'Comment filtrer mes tâches ?',
            value: 'filter-event',
            component: HelpTabFilterEvent
        },
        {
            text: 'Comment échanger mon travail avec mes collègues ?',
            value: 'export-import-event',
            component: HelpTabExportImportEvent
        }
    ]);
    const activeTab: Ref<string> = ref('add-event');
    const delay = ref(1)
</script>