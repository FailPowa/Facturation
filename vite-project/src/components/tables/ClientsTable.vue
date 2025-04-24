<template>
    <v-card>
        <v-data-table :items="clients">
        </v-data-table>
    </v-card>
</template>

<script setup lang="ts">
    import {ClientType} from '../../../types/ClientType';
    import { onUpdated, Ref, ref, watch} from 'vue';

    /** Définition des paramètres du composant */
    const props = defineProps({
        clients: {
            type: Array<any>,
            required: true
        }
    });
    const items = [
        { firstname: "Jean", lastname: "Bob"},
        { firstname: "Jean", lastname: "Bob"},
        { firstname: "Jean", lastname: "Bob"},
        { firstname: "Jean", lastname: "Bob"},
        { firstname: "Jean", lastname: "Bob"},
    ]

    /** Liste des clients sauvegardés */
    const clients : Ref<ClientType[]> = ref([])

    watch(() =>
        props.clients, (newValue: ClientType[]) => {
            clients.value = newValue
            console.log("Passe ici  ")
    })
    
    async function waitAndExecute(): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log(clients.value)
    }

    waitAndExecute()
</script>