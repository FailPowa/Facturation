<template>
<v-container>
    <v-row>
        <v-col>
            <v-container class="d-flex flex-column ga-4">
                
                <!-- Bouton ajouter nouveau client-->
                <v-btn
                    @click="dialog = true"
                    class="d-flex align-self-end"
                    color="success"
                    >
                    <b class="me-2">Ajouter client</b>
                    <v-icon
                        variant="outlined"
                        color="primary"
                    >
                        {{mdiAccountPlus}}
                    </v-icon>
                </v-btn>

                <!-- Tableau contenant tous les clients -->
                <v-card>
                    <v-data-table
                        :items="clients"
                        :headers="clientHeaders"
                    >
                    </v-data-table>
                </v-card>
                
            </v-container>
        </v-col>
    </v-row>

    <!-- Boite de dialogue contenant le formulaire d'ajout d'un client -->
    <v-dialog
        v-model="dialog"
        width="75%"
        persistent
    >
        <ClientForm
            @cancel="dialog = false"
            @confirm="addClient"
            :client="null"
        />
    </v-dialog>
</v-container>
</template>

<style scoped>
.custom-header {
    background-color: #3DADFF;
    color: white;
    font-weight: bold;
    padding: 12px;
    text-align: left;
}
</style>

<script setup lang="ts">
    import {ClientType} from '../../../types/ClientType';
    import { Ref, ref, onMounted} from 'vue';
    import ClientForm from '../forms/ClientForm.vue';
    import { mdiAccountPlus } from '@mdi/js';
    import { clientHeaders } from './headers'


    /** Variable contenant les clients enregistrés */
    const clients : Ref<ClientType[]> = ref([])

        
    /** Variable du dialog */
    const dialog: Ref<boolean> = ref(false);

    /** Récupération des clients au chargement de la page */
    onMounted( async () => {
        await getClients()
    });

        
    /** Ajoute un nouveau client ( A modifier )*/
    async function addClient(newClient: ClientType): Promise<void> {
        await window.serviceElectron.addClient(newClient)
        await getClients()
        dialog.value = false
    };

    /** Récupère les clients */
    async function getClients(){
        clients.value = (await window.serviceElectron.getClients()) as ClientType[]
        console.log(clients.value)
    }
</script>