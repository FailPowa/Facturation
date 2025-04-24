<template>
    <v-container>
        <v-row>
            <v-col offset="10">
                <v-btn
                    @click="dialog = true"
                    class="d-flex align-self-center"
                    >
                    <b>Ajouter client</b>
                    <v-icon
                        variant="outlined"
                        color="primary"
                    >
                        {{mdiAccountPlus}}
                    </v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="10">
                <ClientsTable :clients="clients"/>
            </v-col>
        </v-row>
    </v-container>
    <v-dialog
        v-model="dialog"
        width="auto"
        persistent
    >
        <AddClientDialog
            @cancel="dialog = false"
            @confirm="addClient"
        />
    </v-dialog>
</template>

<script setup lang="ts">
    import { onMounted, Ref, ref } from 'vue';
    import { mdiAccountPlus } from '@mdi/js';
    import AddClientDialog from '../dialogs/AddClientDialog.vue';
    import ClientsTable from '../tables/ClientsTable.vue';
    import { ClientType } from '../../../types/ClientType';
    
    /** Variable du dialog */
    const dialog: Ref<boolean> = ref(false);

    /** Variable contenant les clients enregistrés */
    const clients: Ref<ClientType[]> = ref([]);

    /** Récupération des clients au chargement de la page */
    onMounted( async () => {
        await getClients()
    });
    
        
    /** Ajoute un nouveau client */
    async function addClient(form: ClientType): Promise<void> {
        clients.value = await window.serviceElectron.updateClients({firstname: form.firstname, lastname: form.lastname })
        dialog.value = false
    };

    /** Récupère les clients */
    async function getClients(){
        clients.value = (await window.serviceElectron.getClients()) as ClientType[]
        console.log(clients.value)
    }
</script>