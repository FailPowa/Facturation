<template>
    <v-container>
        <v-row>
            <v-col>
                <v-container class="d-flex flex-column ga-4 ">
                    
                    <!-- Bouton ajouter nouvelle facture -->
                    <v-btn
                        class="d-flex align-self-end animate__animated animate__backInRight"
                        color="success"
                        @click=""
                    >
                        <b class="me-2">Ajouter une facture</b>
                        <v-icon
                            variant="outlined"
                            color="primary"
                        >
                            {{mdiReceiptTextPlusOutline}}
                        </v-icon>
                    </v-btn>

                    
                    <!-- Tableau contenant les factures -->
                    <v-data-table
                        :items="factures"
                        :headers="factureHeaders"
                        class="animate__animated animate__zoomIn"
                    >
                    <template #top>
                        <v-row class="px-4 pt-4">
                            <v-col cols="12" md="4" >
                                <v-autocomplete
                                    label="Date"
                                    type="number"
                                    dense
                                    outlined
                                    clearable
                                    :items="[2025, 2024, 2023, 2022, 2021]"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                    </template>

                        <template v-slot:item.client="{ item }">
                            <p>{{ clients.find( client => client.id === item.clientId)?.nom || "Inconnu" }}</p>
                        </template>

                        <template v-slot:item.date="{ item }">
                            <p>{{ formatDate(item.date, 'DD/MM/YYYY') }}</p>
                        </template>
                        
                        <template v-slot:item.montantHt="{ item }">
                            <p>{{ item.tjm * item.nbJours }} €</p>
                        </template>
                        
                        <template v-slot:item.tva="{ item }">
                            <v-icon
                                variant="outlined"
                                :color="item.tva ? 'green' : 'red'"
                            >
                                {{
                                    item.tva ? mdiCheckCircleOutline : mdiMinusCircleOutline
                                }}
                            </v-icon>   
                        </template>

                        <template v-slot:item.montantTTC="{ item }">
                            <p>{{ (item.tjm * item.nbJours) * 1.2 }} €</p>
                        </template>
                        
                        <template v-slot:item.statut="{ item }">
                            <v-chip 
                                :color="statuts.find( statut => statut.id === item.statutId)?.color || 'primary'"
                                variant="flat"
                            >
                                {{ statuts.find( statut => statut.id === item.statutId)?.text || 'Statut inconnu' }}
                            </v-chip>
                        </template>

                        <template v-slot:item.datePaiement="{ item }">
                            <p 
                                v-if="item.datePaiement !== null"
                            >
                                {{ formatDate(item.datePaiement, 'DD/MM/YYYY') }}
                            </p>
                            <v-icon 
                                v-if="item.datePaiement === null"
                                color="red"
                            >
                                {{ mdiMinusCircleOutline }}
                            </v-icon>
                        </template>

                        <!-- Boutons actions (visualiser, modifier, supprimer) -->
                        <template v-slot:item.actions="{ item }">
                            <div class="d-flex ga-2 justify-center">
                                <!-- Bouton Visualiser -->
                                <v-icon 
                                    color="info" 
                                    size="small" 
                                    @click=""
                                >
                                    {{ mdiEyeOutline }}
                                </v-icon>
                                <!-- Bouton modifier -->
                                <v-icon 
                                    color="primary" 
                                    size="small" 
                                    @click=""
                                >
                                    {{ mdiPencilOutline }}
                                </v-icon>

                                <!-- Bouton supprimer -->
                                <v-icon 
                                    color="error" 
                                    size="small" 
                                    @click=""
                                >
                                    {{ mdiDeleteOutline }}
                                </v-icon>
                            </div>
                        </template>
                    </v-data-table>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>


<script setup lang="ts">
    import { FactureType, StatutType, EntrepriseType } from '../../../types';
    import { Ref, ref, onMounted} from 'vue';
    import { 
        mdiReceiptTextPlusOutline, 
        mdiDeleteOutline, 
        mdiPencilOutline, 
        mdiEyeOutline,
        mdiCheckCircleOutline,
        mdiMinusCircleOutline

    } from '@mdi/js';
    import { factureHeaders } from './headers';
    import { formatDate } from '../../../plugins/dateFormatter';


    /** Variable contenant les factures enregistrées */
    const factures : Ref<FactureType[]> = ref([]);

    const statuts : Ref<StatutType[]> = ref([]);

    const clients : Ref<EntrepriseType[]> = ref([]);

    /** Variable contenant la facture en cours de modication */
    // const updatingFacture : Ref<FactureType | null> = ref(null);
    
    /** Variable contenant l'id de la facture en attente de confirmation de sa suppression */
    // const deletingFacture: Ref<FactureType | null> = ref(null)
    
    /** Variables des boites de dialogues */
    // const addFactureDialog: Ref<boolean> = ref(false);
    // const updateFactureDialog: Ref<boolean> = ref(false);
    // const deleteConfirmDialog: Ref<boolean> = ref(false);

    
    /** Récupération des clients au chargement de la page */
    onMounted( async () => {
        await getFactures()
        await getStatuts()
        await getClients()
    });

    
    /** Ajoute une nouvelle facture */
    /** async function addFacture(newFacture: FactureType): Promise<void> {
        await window.serviceElectron.addFacture(newFacture)
        await getFactures()
        addFactureDialog.value = false
    } */

    /** Met à jour une facture */
    // async function updateFacture(updatedFacture: FactureType): Promise<void>

    /** Supprime un client */
    /** async function deleteFacture(): Promise<void>{
        if (deletingFacture.value !== null){
            await window.serviceElectron.deleteClient(deletingFacture.value.id)
            await getFactures()
            deleteConfirmDialog.value = false
            deletingClient.value = null
        }
    } */

    /** Récupère les factures */
    async function getFactures(){
        factures.value = (await window.serviceElectron.getFactures()) as FactureType[]
    }

    /** Récupère les statuts */
    async function getStatuts(){
        statuts.value = (await window.serviceElectron.getStatuts()) as StatutType[]
    }

    async function getClients(){
        clients.value = (await window.serviceElectron.getClients()) as EntrepriseType[]
    }
</script>