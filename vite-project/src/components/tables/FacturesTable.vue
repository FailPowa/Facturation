<template>
    <v-container>
        <v-row>
            <v-col>
                <v-container class="d-flex flex-column ga-4 ">

                    <v-container class="d-flex justify-space-between">

                        <v-select
                                v-model="actualYear"
                                :items="years"
                                density="compact"
                                label="Date"
                                type="number"
                                variant="outlined"
                                @update:modelValue="getFullFacturesByYear"
                                maxWidth="300"
                        ></v-select>
                        
                        <!-- Bouton ajouter nouvelle facture -->
                        <v-btn
                            class="d-flex justify-end animate__animated animate__backInRight"
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
                    </v-container>
                    
                    <!-- Tableau contenant les factures -->
                    <v-data-table
                        :items="fullFactures"
                        :headers="factureHeaders"
                        class="animate__animated animate__zoomIn"
                    >
                        <!-- Ajoute une ligne au début du body -->
                        <template #body.prepend>
                            <tr>
                                <td class="font-weight-bold	">TOTAL</td> <!-- ID -->
                                <td></td> <!-- Date -->
                                <td></td> <!-- Client -->
                                <td class="font-weight-bold	">
                                    {{
                                        fullFactures
                                        .map(facture => facture.tjm * facture.nbJours)
                                        .reduce((acc, curr) => acc + curr, 0)
                                        .toFixed(2)
                                    }} €
                                </td> <!-- Montant HT -->
                                <td></td> <!-- TVA -->
                                <td class="font-weight-bold	">
                                    {{
                                        fullFactures
                                        .map(facture => facture.tjm * facture.nbJours * 1.2)
                                        .reduce((acc, curr) => acc + curr, 0)
                                        .toFixed(2)
                                    }} €
                                </td> <!-- Montant TTC -->
                                <td></td> <!-- Statut -->
                                <td></td> <!-- Date paiement -->
                                <td></td> <!-- Actions -->
                            </tr>
                        </template>


                        <template v-slot:item.client="{ item }">
                            <p>{{ item.client.nom }}</p>
                        </template>

                        <template v-slot:item.date="{ item }">
                            <p>{{ formatDate(item.date) }}</p>
                        </template>
                        
                        <template v-slot:item.montantHt="{ item }">
                            <p>{{ item.tjm * item.nbJours }} €</p>
                        </template>
                        
                        <template v-slot:item.tva="{ item }">
                            <v-icon
                                :color="item.tva ? 'green' : 'red'"
                                variant="outlined"
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
                                :color="item.statut.color"
                                variant="flat"
                            >
                                {{ item.statut.text }}
                            </v-chip>
                        </template>

                        <template v-slot:item.datePaiement="{ item }">
                            <p 
                                v-if="item.datePaiement !== null"
                            >
                                {{ formatDate(item.datePaiement) }}
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
    import { FullFactureType } from '../../../types';
    import { Ref, ref, onMounted, onUpdated} from 'vue';
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
    const fullFactures : Ref<FullFactureType[]> = ref([]);

    /** Variable contenant les années des factures */
    const years : Ref<number[]> = ref([])

    const actualYear = ref()

    /** Variable contenant la facture en cours de modication */
    // const updatingFacture : Ref<FactureType | null> = ref(null);
    
    /** Variable contenant l'id de la facture en attente de confirmation de sa suppression */
    // const deletingFacture: Ref<FactureType | null> = ref(null)
    
    /** Variables des boites de dialogues */
    //const addFactureDialog: Ref<boolean> = ref(false);
    // const updateFactureDialog: Ref<boolean> = ref(false);
    // const deleteConfirmDialog: Ref<boolean> = ref(false);

    
    /** Récupération des clients au chargement de la page */
    onMounted( async () => {
        await getYears();
        actualYear.value = Math.max(...years.value)
        await getFullFacturesByYear(actualYear.value);
        console.log(actualYear)
    });

    /**
     * Mise à jour des années
     */
    onUpdated( async () => {
        await getYears()
    })
    
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
    async function getFullFacturesByYear(year: number){
        fullFactures.value = (await window.serviceElectron.getFullFacturesByYear(year)) as FullFactureType[]
    }

    /** Récupère les années des factures */
    async function getYears(){
        years.value = (await window.serviceElectron.getAllFacturesYears())
    }
</script>