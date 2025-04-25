<template>
<v-container>
    <v-row>
        <v-col>
            <v-container class="d-flex flex-column ga-4">
                
                <!-- Bouton ajouter nouveau client-->
                <v-btn
                    @click="addClientDialog = true"
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
                        <!-- Boutons actions (visualiser, modifier, supprimer) -->
                        <template v-slot:item.actions="{ item }">
                            <div class="d-flex ga-2 justify-end">
                                <!-- Bouton visualiser client -->
                                <v-icon 
                                    color="primary" 
                                    size="small"
                                    @click=""
                                >
                                    {{ mdiEyeOutline }}
                                </v-icon>

                                <!-- Bouton modifier -->
                                <v-icon 
                                    color="primary" 
                                    size="small" 
                                    @click="updateClientDialog = true; updatingClient = item"
                                >
                                    {{ mdiPencilOutline }}
                                </v-icon>

                                <!-- Bouton supprimer -->
                                <v-icon 
                                    color="error" 
                                    size="small" 
                                    @click="deleteConfirmDialog = true; deletingClient = item"
                                >
                                    {{ mdiDeleteOutline }}
                                </v-icon>
                            </div>
                        </template>
                    </v-data-table>
                </v-card>
                
            </v-container>
        </v-col>
    </v-row>

    <!-- Boite de dialogue contenant le formulaire d'ajout d'un client -->
    <v-dialog
        v-model="addClientDialog"
        width="75%"
        persistent
    >
        <ClientForm
            @cancel="addClientDialog = false"
            @confirm="addClient"
            :formTitle="'Modifier client'"
            :client="null"
        />
    </v-dialog>

    <!-- Boite de dialogue contenant le formulaire de modification d'un client -->
    <v-dialog
        v-model="updateClientDialog"
        width="75%"
        persistent
    >
        <ClientForm
            @cancel="updateClientDialog = false"
            @confirm="updateClient"
            :formTitle="'Créer un client'"
            :client="updatingClient"
        />
    </v-dialog>
    
    <!-- Boite de dialogue de confirmation de suppresion d'un client -->
    <v-dialog
        v-model="deleteConfirmDialog"
        max-width="600"
        persistent
    >
        <ConfirmDialog 
            @cancel="deleteConfirmDialog = false"
            @confirm="deleteClient"
            :question-title="`Êtes-vous certain de vouloir supprimer le client ${deletingClient?.nom} ?`"
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
    import ConfirmDialog from '../dialogs/ConfirmDialog.vue';
    import { mdiAccountPlus, mdiEyeOutline, mdiDeleteOutline, mdiPencilOutline } from '@mdi/js';
    import { clientHeaders } from './headers'


    /** Variable contenant les clients enregistrés */
    const clients : Ref<ClientType[]> = ref([]);

    /** Variable contenant l'entreprise cliente en cours de modication */
    const updatingClient : Ref<ClientType | null> = ref(null);
    
    /** Variable contenant l'id de l'entreprise en attente de confirmation de sa suppression */
    const deletingClient: Ref<ClientType | null> = ref(null)
    
    
    /** Variables des boites de dialogues */
    const addClientDialog: Ref<boolean> = ref(false);
    const updateClientDialog: Ref<boolean> = ref(false);
    const deleteConfirmDialog: Ref<boolean> = ref(false);

    
    /** Récupération des clients au chargement de la page */
    onMounted( async () => {
        await getClients()
    });

        
    /** Ajoute un nouveau client ( A modifier )*/
    async function addClient(newClient: ClientType): Promise<void> {
        await window.serviceElectron.addClient(newClient)
        await getClients()
        addClientdialog.value = false
    };

    
    /** Met à jour un client */
    async function updateClient(updatedClient: ClientType): Promise<void>{
        if (updatingClient.value !== null){
            await window.serviceElectron.updateClient(updatingClient.value.id, updatedClient)
            await getClients()
            updateClientDialog.value = false
            updatingClient.value = null
        }
    }

    /** Supprime un client */
    async function deleteClient(): Promise<void>{
        if (deletingClient.value !== null){
            await window.serviceElectron.deleteClient(deletingClient.value.id)
            await getClients()
            deleteConfirmDialog.value = false
            deletingClient.value = null
        }
    }

    /** Récupère les clients */
    async function getClients(){
        clients.value = (await window.serviceElectron.getClients()) as ClientType[]
    }
</script>