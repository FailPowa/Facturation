<template>
<v-container>
    <v-row>
        <v-col>
            <v-container class="d-flex flex-column ga-4">
                
                <!-- Bouton ajouter nouveau client-->
                <v-btn
                    @click="addClientDialog = true"
                    class="d-flex align-self-end animate__animated animate__fadeInDown"
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
                <v-data-table
                    :items="clients"
                    :headers="clientHeaders"
                    class="animate__animated animate__fadeInUp"
                >

                    <template v-slot:item.adresse="{ item }">
                        <p>{{ `${item.adresse} ${item.codePostal} ${item.ville}` }}</p>
                    </template>
                    
                    <template v-slot:item.numTva="{ item }">
                        <p>{{ numTvaFormatter(item.numTva) }}</p>
                    </template>
                    
                    <template v-slot:item.siret="{ item }">
                        <p>{{ siretFormatter(item.siret) }}</p>
                    </template>

                    <!-- Boutons actions (visualiser, modifier, supprimer) -->
                    <template v-slot:item.actions="{ item }">
                        <div class="d-flex ga-2 justify-center">
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
            </v-container>
        </v-col>
    </v-row>

    <!-- Boite de dialogue contenant le formulaire d'ajout d'un client -->
    <v-dialog
        v-model="addClientDialog"
        width="75%"
        persistent
    >
        <EntrepriseForm
            @cancel="addClientDialog = false"
            @confirm="addClient"
            :formTitle="'Créer un client'"
            :entreprise="null"
        />
    </v-dialog>

    <!-- Boite de dialogue contenant le formulaire de modification d'un client -->
    <v-dialog
        v-model="updateClientDialog"
        width="75%"
        persistent
    >
        <EntrepriseForm
            @cancel="updateClientDialog = false"
            @confirm="updateClient"
            :formTitle="'Modifier client'"
            :entreprise="updatingClient"
        />
    </v-dialog>
    
    <!-- Boite de dialogue de confirmation de suppresion d'un client -->
    <v-dialog
        v-model="deleteConfirmDialog"
        max-width="800"
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
    import {EntrepriseType} from '../../../types/EntrepriseType';
    import { numTvaFormatter, siretFormatter } from '../../../plugins/entrepriseFormatter'
    import { Ref, ref, onMounted} from 'vue';
    import EntrepriseForm from '../forms/EntrepriseForm.vue';
    import ConfirmDialog from '../dialogs/ConfirmDialog.vue';
    import { mdiAccountPlus, mdiDeleteOutline, mdiPencilOutline } from '@mdi/js';
    import { clientHeaders } from './headers'


    /** Variable contenant les entreprises clientes enregistrés */
    const clients : Ref<EntrepriseType[]> = ref([]);

    /** Variable contenant l'entreprise cliente en cours de modication */
    const updatingClient : Ref<EntrepriseType | null> = ref(null);
    
    /** Variable contenant l'id de l'entreprise en attente de confirmation de sa suppression */
    const deletingClient: Ref<EntrepriseType | null> = ref(null)
    
    
    /** Variables des boites de dialogues */
    const addClientDialog: Ref<boolean> = ref(false);
    const updateClientDialog: Ref<boolean> = ref(false);
    const deleteConfirmDialog: Ref<boolean> = ref(false);

    
    /** Récupération des clients au chargement de la page */
    onMounted( async () => {
        await getClients()
    });

        
    /** Ajoute un nouveau client */
    async function addClient(newClient: EntrepriseType): Promise<void> {
        await window.serviceElectron.addClient(newClient)
        await getClients()
        addClientDialog.value = false
    };

    
    /** Met à jour un client */
    async function updateClient(updatedClient: EntrepriseType): Promise<void>{
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
        clients.value = (await window.serviceElectron.getClients()) as EntrepriseType[]
    }
</script>