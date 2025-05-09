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
                            @click="addFactureDialog = true"
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
                        
                        <template #no-data>
                            <p>Aucune facture enregistrée</p>
                        </template>

                        <template v-slot:item.client="{ item }">
                            <p>{{ item.client.nom }}</p>
                        </template>

                        <template v-slot:item.date="{ item }">
                            <p>{{ formatDate(item.date) }}</p>
                        </template>
                        
                        <template v-slot:item.montantHt="{ item }">
                            <p>{{ (item.tjm * item.nbJours).toFixed(2) }} €</p>
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
                            <p>{{ (item.tjm * item.nbJours * 1.2).toFixed(2) }} €</p>
                        </template>
                        
                        <template v-slot:item.statut="{ item }">
                            <StatutChip 
                                :facture="item"
                                @update-statut="updatingFacture = item; updateFactureDialog = true"
                                @add-date-payment="addDatePaiementFacture = item; addDatePaiementDialog = true"
                            />
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
                                    v-if="item.statut.id !== 3"
                                    color="primary" 
                                    size="small" 
                                    @click="updatingFacture = item; updateFactureDialog = true;"
                                >
                                    {{ mdiPencilOutline }}
                                </v-icon>

                                <!-- Bouton supprimer -->
                                <v-icon 
                                    color="error" 
                                    size="small" 
                                    @click="deletingFacture = item; deleteConfirmDialog = true;"
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

    <!-- Boite de dialogue contenant le formulaire d'ajout d'une facture -->
    <v-dialog
            v-model="addFactureDialog"
            width="75%"
            persistent
        >
            <FactureForm
                :facture="null"
                form-title="Ajouter une facture"   
                @cancel="addFactureDialog = false"
                @confirm="addFacture"
                @save="saveFactureAsBrouillon"
            />
    </v-dialog>

    <!-- Boite de dialogue contenant le formulaire de mise à jour d'une facture -->
    <v-dialog
            v-model="updateFactureDialog"
            width="75%"
            persistent
        >
            <FactureForm
                :facture="updatingFacture"
                form-title="Mettre à jour une facture"
                @cancel="updateFactureDialog = false"
                @confirm="updateFacture"
                @save="saveFactureAsBrouillon"
            />
    </v-dialog>

    <!-- Boite de dialogue pour valider le paiement d'une facture -->
    <v-dialog
        v-model="addDatePaiementDialog" 
        width="75%"
        persistent
    >
        <AddPaymentDateDialog
            :facture="addDatePaiementFacture"
            @cancel="addDatePaiementDialog = false"
            @confirm="addDatePaiement"
        />
    </v-dialog>

    <!-- Boite de dialogue de confirmation de suppresion d'un client -->
    <v-dialog
            v-model="deleteConfirmDialog"
            max-width="800"
            persistent
        >
            <ConfirmDialog 
                :question-title="`Êtes-vous certain de vouloir supprimer la facture n°${deletingFacture?.id} ?`"
                @cancel="deleteConfirmDialog = false"
                @confirm="deleteFacture"
            />
    </v-dialog>
</template>


<script setup lang="ts">
    import { FullFactureType, FactureType } from '../../../types';
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
    import { formatDate, getCurrentYear } from '../../../plugins/dateFormatter';
    import FactureForm from '../forms/FactureForm.vue';
    import StatutChip from '../chips/StatutChip.vue';
    import AddPaymentDateDialog from '../dialogs/AddPaymentDateDialog.vue';
    import ConfirmDialog from '../dialogs/ConfirmDialog.vue'


    /** Variable contenant les factures enregistrées */
    const fullFactures : Ref<FullFactureType[]> = ref([]);

    /** Variable contenant les années des factures */
    const years : Ref<number[]> = ref([])

    /** Variable contenant l'année des factures actuellement affichés dans le tableau */
    const actualYear = ref()

    /** Variable contenant la facture en cours de modication */
    const updatingFacture : Ref<FullFactureType | null> = ref(null);
    
    /** Variable contenant l'id de la facture en attente de confirmation de sa suppression */
    const deletingFacture: Ref<FullFactureType | null> = ref(null)
    
    /** Variable contenant */
    const addDatePaiementFacture: Ref<FullFactureType | null> = ref(null)
    
    /** Variables des boites de dialogues */
    const addFactureDialog: Ref<boolean> = ref(false);
    const updateFactureDialog: Ref<boolean> = ref(false);
    const deleteConfirmDialog: Ref<boolean> = ref(false);
    const addDatePaiementDialog: Ref<boolean> = ref(false)

    
    /** Récupération des clients au chargement de la page */
    onMounted( async () => {
        await getYears();
        actualYear.value = Math.max(...years.value)
        await getFullFacturesByYear(actualYear.value);
    });

    /**
     * Mise à jour des années
     */
    onUpdated( async () => {
        await getYears();
    })

    /** Ajoute une facture en tant que brouillon */
    async function saveFactureAsBrouillon(facture: FactureType): Promise<void> {
        facture.statutId = 1; // Statut n°1 : Brouillon
        if (facture.id !== ""){
            await window.serviceElectron.updateFacture(JSON.stringify(facture));
            updatingFacture.value = null
            updateFactureDialog.value = false;
        }else{
            await window.serviceElectron.addFacture(JSON.stringify(facture));
            addFactureDialog.value = false;
        }
        await getYears();
        await getFullFacturesByYear(actualYear.value);
    }
    
    /** Ajoute une nouvelle facture */
    async function addFacture(newFacture: FactureType): Promise<void> {
        newFacture.statutId = 2 // Statut n°2 : 
        await window.serviceElectron.addFacture(JSON.stringify(newFacture));
        const date = new Date(newFacture.date)
        actualYear.value = date.getFullYear()
        await getFullFacturesByYear(actualYear.value);
    }

    /**
     * Ajoute la date de paiement à une facture
     * @param datePaiement Date de paiement
     */
    async function addDatePaiement(datePaiement: Date) {
        if (addDatePaiementFacture.value !== null){
            const fullFacture = addDatePaiementFacture.value
            const updatedFacture: FactureType = {
                id: fullFacture.id,
                isAvoir: fullFacture.isAvoir,
                date: fullFacture.date,
                tjm: fullFacture.tjm,
                nbJours: fullFacture.nbJours,
                entrepriseId: fullFacture.entreprise.id,
                clientId: fullFacture.client.id,
                tva: fullFacture.tva,
                nbJoursPaiement: fullFacture.nbJoursPaiement,
                statutId: 3, // Statut n°3 : Payée
                datePaiement: datePaiement
            }
            const json = JSON.stringify(updatedFacture)
            await window.serviceElectron.updateFacture(json);
            await getFullFacturesByYear(actualYear.value)
            addDatePaiementFacture.value = null
            addDatePaiementDialog.value = false
        }
    }

    /** Met à jour une facture */
    async function updateFacture(updatedFacture: FactureType): Promise<void> {
        if (updatingFacture.value !== null){
            updatedFacture.statutId = 2; // Statut n°2 : Impayée
            await window.serviceElectron.updateFacture(JSON.stringify(updatedFacture));
            await getYears()
            await getFullFacturesByYear(actualYear.value);
            updatingFacture.value = null
            updateFactureDialog.value = false
        }
    }

    /** Supprime un client */
    async function deleteFacture(): Promise<void> {
        if (deletingFacture.value !== null){
            await getYears()
            await window.serviceElectron.deleteFacture(deletingFacture.value.id)
            await getFullFacturesByYear(actualYear.value)
            deleteConfirmDialog.value = false
            deletingFacture.value = null
        }
    }

    /** Récupère les factures */
    async function getFullFacturesByYear(year: number) {
        fullFactures.value = (await window.serviceElectron.getFullFacturesByYear(year)) as FullFactureType[]
    }

    /** Récupère les années des factures */
    async function getYears() {
        years.value = (await window.serviceElectron.getAllFacturesYears())
        actualYear.value = years.value.length === 0 ? getCurrentYear() : Math.max(...years.value)
    }
</script>