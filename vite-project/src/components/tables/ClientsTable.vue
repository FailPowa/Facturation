<template>
    <v-container>
        <v-row>
            <v-col>
                <v-container class="d-flex flex-column ga-4 ">
                    
                    <!-- Bouton ajouter nouveau client-->
                    <v-btn
                        class="d-flex align-self-end animate__animated animate__backInRight"
                        color="success"
                        @click="addClientDialog = true"
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
                        class="animate__animated animate__zoomIn"
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
                                    @click="setClient(item)"
                                >
                                    {{ mdiPencilOutline }}
                                </v-icon>

                                <!-- Bouton supprimer -->
                                <v-icon 
                                    color="error" 
                                    size="small" 
                                    @click="removeClient(item)"
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
                :formTitle="'Créer un client'"
                :entreprise="null"
                @cancel="cancelAddClientDialog"
                @confirm="addClient"
            />
        </v-dialog>

        <!-- Boite de dialogue contenant le formulaire de modification d'un client -->
        <v-dialog
            v-model="updateClientDialog"
            width="75%"
            persistent
        >
            <EntrepriseForm
                :formTitle="'Modifier client'"
                :entreprise="selectedClient"
                @cancel="cancelUpdateDialog"
                @confirm="updateClient"
            />
        </v-dialog>
        
        <!-- Boite de dialogue de confirmation de suppresion d'un client -->
        <v-dialog
            v-model="deleteConfirmDialog"
            max-width="800"
            persistent
        >
            <ConfirmDialog 
                :question-title="`Êtes-vous certain de vouloir supprimer le client ${selectedClient?.nom} ?`"
                @cancel="cancelDeleteDialog"
                @confirm="deleteClient"
            />
        </v-dialog>

        <!-- Boite de dialoge : Alerte suppression client -->
        <v-dialog
            v-model="warningDeleteClientDialog"
        >
            <AlertDialog
                v-model="warningDeleteClientDialog"
                :text="`Le client ne peut pas être supprimé car il est lié à plusieurs factures.`"
                type="warning"
                title="Attention! Suppression client impossible"
            />
        </v-dialog>
    </v-container>
</template>


<script setup lang="ts">
    import { EntrepriseType } from '../../../types';
    import { numTvaFormatter, siretFormatter } from '../../../plugins/entrepriseFormatter'
    import { Ref, ref, onMounted} from 'vue';
    import EntrepriseForm from '../forms/EntrepriseForm.vue';
    import ConfirmDialog from '../dialogs/ConfirmDialog.vue';
    import AlertDialog from '../dialogs/AlertDialog.vue';
    import { mdiAccountPlus, mdiDeleteOutline, mdiPencilOutline } from '@mdi/js';
    import { clientHeaders } from './headers'


    /** Variable contenant les entreprises clientes enregistrés */
    const clients : Ref<EntrepriseType[]> = ref([]);

    /** Variable contenant l'entreprise cliente selectionné pour appliquer une suppression/modification dessus */
    const selectedClient : Ref<EntrepriseType | null> = ref(null);
    
    /** Variables des boites de dialogues */
    const addClientDialog: Ref<boolean> = ref(false);
    const updateClientDialog: Ref<boolean> = ref(false);
    const deleteConfirmDialog: Ref<boolean> = ref(false);
    const warningDeleteClientDialog: Ref<boolean> = ref(false);

    
    /** Récupération des clients au chargement de la page */
    onMounted( async () => {
        await getClients()
    });

    /** Clic sur le bouton supprimer client */
    function setClient(client: EntrepriseType){
        updateClientDialog.value = true; 
        selectedClient.value = client;
    }

    /** Clic sur le bouton modifier client */
    async function removeClient(client: EntrepriseType){
        const canClientBeDeleted = !(await isClientInFactures(client.id))
        if (canClientBeDeleted){
            selectedClient.value = client;
            deleteConfirmDialog.value = true; 
        }else{
            selectedClient.value = null
            warningDeleteClientDialog.value = true
        }
    }

    /** Fermer boite de dialogue de modification du client selectionné */
    function cancelUpdateDialog(){
        updateClientDialog.value = false;
    }

    /** Fermer boite de dialogue d'ajout d'un client */
    function cancelAddClientDialog(){
        addClientDialog.value = false;
    }

    /** Fermer boite de dialogue de suppression du client selectionné */
    function cancelDeleteDialog(){
        deleteConfirmDialog.value = false;
    }

    /** Ajoute un nouveau client */
    async function addClient(newClient: EntrepriseType): Promise<void> {
        await window.serviceElectron.addClient(newClient)
        await getClients()
        addClientDialog.value = false
    };

    /** Met à jour un client */
    async function updateClient(updatedClient: EntrepriseType): Promise<void>{
        if (selectedClient.value !== null){
            await window.serviceElectron.updateClient(selectedClient.value.id, updatedClient)
            await getClients()
            updateClientDialog.value = false
            selectedClient.value = null
        }
    }

    /** Supprime un client */
    async function deleteClient(): Promise<void>{
        if (selectedClient.value !== null){
            await window.serviceElectron.deleteClient(selectedClient.value.id)
            await getClients()
            deleteConfirmDialog.value = false
            selectedClient.value = null
        }
    }

    /** Récupère les clients */
    async function getClients(){
        clients.value = (await window.serviceElectron.getClients()) as EntrepriseType[]
    }

    /** Vérifie si un client est présent dans une des factures existantes */
    async function isClientInFactures(id_client: number): Promise<boolean> {
        return await window.serviceElectron.isClientInFactures(id_client);   
    }
</script>