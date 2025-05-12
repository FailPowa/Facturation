<template>
    <v-container>
        <v-row>
            <v-col class="d-flex flex-column ga-4 justify-space-between">
                <v-select
                    v-model="selectedYear"
                    :items="years"
                    density="compact"
                    label="Date"
                    type="number"
                    variant="outlined"
                    maxWidth="300"
                    @update:modelValue="setSelectedYear"
                />
            </v-col>
            <v-col offset="6" class="d-flex flex-column justify-space-between">
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
                        {{ icons.mdiReceiptTextPlusOutline }}
                    </v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="d-flex flex-column ga-4">
                <v-data-table
                    :items="factures"
                    :headers="factureHeaders"
                >
                    <!-- Override du no-data -->
                    <template #no-data>
                        <p>Aucune facture enregistrée</p>
                    </template>
                    <!-- Ajout d'une ligne TOTAL en entête -->
                    <template 
                        v-if="factures.length > 0"
                        #body.prepend
                    >
                        <tr>
                            <td>TOTAL</td>
                            <td></td>
                            <td></td>
                            <td class="text-end">
                                {{
                                    formatMontantEuro(
                                        factures
                                            .map(facture => {
                                                return calculMontantHT(
                                                    facture.tjm,
                                                    facture.nbJours,
                                                    facture.isAvoir                                                )
                                            }).reduce((acc, curr) => acc + curr, 0)
                                            
                                    )
                                }}
                            </td>
                            <td></td>
                            <td class="text-end">
                                {{
                                    formatMontantEuro(
                                        factures
                                            .map(facture => {
                                                return calculMontantTTC(
                                                    facture.tjm,
                                                    facture.nbJours,
                                                    facture.isAvoir,
                                                    facture.tva
                                                )
                                            }).reduce((acc, curr) => acc + curr, 0)
                                            
                                    )
                                }}
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </template>
                    <!-- Override des colonnes du tableau -->
                    <template #item.client="{ item }">
                        {{ item.client.nom }}
                    </template>
                    <template #item.date="{ item }">
                        {{ formatDate(item.date) }}
                    </template>
                    <template #item.montantHt="{ item }">
                        <p>
                            {{ 
                                formatMontantEuro(
                                    calculMontantHT(
                                        item.tjm,
                                        item.nbJours,
                                        item.isAvoir
                                    )
                                ) 
                            }}
                        </p>
                    </template>
                    <template #item.tva="{ item }">
                        <v-icon
                            v-if="item.tva"
                            color="green"
                            variant="outlined"
                        >
                            {{ icons.mdiCheckCircleOutline }}
                        </v-icon>
                        <v-icon
                            v-else
                            color="red"
                            variant="outlined"
                        >
                            {{ icons.mdiMinusCircleOutline }}
                        </v-icon>
                    </template>
                    <template #item.montantTTC="{ item }">
                        <p>
                            {{ 
                                formatMontantEuro(
                                    calculMontantTTC(
                                        item.tjm,
                                        item.nbJours,
                                        item.isAvoir,
                                        item.tva
                                    )
                                )
                            }}
                        </p>
                    </template>
                    <template #item.statut="{ item }">
                        <StatutChip
                            :statut="item.statut"
                            @update-statut="updateStatut(item, $event)"
                        />
                    </template>
                    <template #item.datePaiement="{ item }">
                        <p v-if="item.datePaiement !== null">{{ formatDate(item.datePaiement) }}</p>
                        <v-icon 
                            v-else
                            color="red"
                        >
                            {{ icons.mdiMinusCircleOutline }}
                        </v-icon>
                    </template>
                    <template #item.actions="{ item }">
                        <div class="d-flex ga-2 justify-center">
                            <!-- Bouton Visualiser -->
                            <v-icon
                                color="info"
                                size="small"
                            >
                                {{ icons.mdiEyeOutline }}
                            </v-icon>
                            <!-- Bouton Modifier -->
                            <v-icon
                                v-if="item.statut.value !== 'PAYEE'"
                                color="primary"
                                size="small"
                                @click="setFacture(item)"
                            >
                                {{ icons.mdiPencilOutline }}
                            </v-icon>
                            <!-- Bouton Supprimer -->
                            <v-icon
                                v-if="item.statut.value !== 'PAYEE'"
                                color="error"
                                size="small"
                                @click="removeFacture(item)"
                            >
                                {{ icons.mdiDeleteOutline }}
                            </v-icon>
                        </div>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>

    <!-- Dialog d'ajout d'une facture -->
    <v-dialog
        v-model="addFactureDialog"
        width="75%"
        persistent
    >
        <FactureForm
            :facture="null"
            form-title="Ajouter une facture"
            @cancel="addFactureDialog = false"
            @confirm="saveFacture($event, 'IMPAYEE')"
            @save="saveFacture($event, 'BROUILLON')"
        />
    </v-dialog>

    <!-- Dialog de màj d'une facture -->
    <v-dialog
        v-model="updateFactureDialog"
        width="75%"
        persistent
    >
        <FactureForm
            :facture="selectedFacture"
            form-title="Modifier une facture"
            @cancel="updateFactureDialog = false"
            @confirm="saveFacture($event, 'IMPAYEE')"
            @save="saveFacture($event, 'BROUILLON')"
        />
    </v-dialog>

    <!-- Boite de dialogue pour valider le paiement d'une facture -->
    <v-dialog
        v-model="addDatePaiementDialog" 
        width="75%"
        persistent
    >
        <AddPaymentDateDialog
            :facture="selectedFacture"
            @cancel="addDatePaiementDialog = false"
            @confirm="addDatePaiement"
        />
    </v-dialog>

    <!-- Boite de dialogue de confirmation de suppresion d'un client -->
    <v-dialog
            v-model="deleteFactureDialog"
            max-width="800"
            persistent
        >
            <ConfirmDialog 
                :question-title="`Êtes-vous certain de vouloir supprimer la facture n°${selectedFacture?.id} ?`"
                @cancel="deleteFactureDialog = false"
                @confirm="deleteFacture"
            />
    </v-dialog>
</template>
<script setup lang="ts">
    import { FullFactureType, FactureType, StatutType } from '../../../types';
    import { Ref, ref, onMounted } from 'vue';
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
    import { formatMontantEuro } from '../../../plugins/formatMontantEuro';
    import FactureForm from '../forms/FactureForm.vue';
    import StatutChip from '../chips/StatutChip.vue';
    import AddPaymentDateDialog from '../dialogs/AddPaymentDateDialog.vue';
    import ConfirmDialog from '../dialogs/ConfirmDialog.vue';

    /** Icones */
    const icons = { 
        mdiReceiptTextPlusOutline, 
        mdiDeleteOutline, 
        mdiPencilOutline, 
        mdiEyeOutline,
        mdiCheckCircleOutline,
        mdiMinusCircleOutline
    };

    /** Sélecteur d'année */
    const selectedYear: Ref<number> = ref(getCurrentYear());
    const years: Ref<number[]> = ref([getCurrentYear()]);

    /** Tableau */
    const factures: Ref<FullFactureType[]> = ref([]);
    const selectedFacture: Ref<FullFactureType | null> = ref(null);

    /** Dialogs */
    const addFactureDialog: Ref<boolean> = ref(false);
    const updateFactureDialog: Ref<boolean> = ref(false);
    const deleteFactureDialog: Ref<boolean> = ref(false);
    const addDatePaiementDialog: Ref<boolean> = ref(false);

    /** Mounted */
    onMounted(async () => {
        /** On remplis le sélecteur d'année & on sélectionne l'année la plus récente */
        await getYears();
        /** On remplis le tableau des factures de l'année sélectionnée */
        await getFacturesByYear();
    });

    /** Modification de l'année sélectionnée */
    function setSelectedYear(value: number): void {
        selectedYear.value = value;
        getFacturesByYear();
    }

    /** Clic sur le bouton modifier d'une facture */
    function setFacture(facture: FullFactureType): void {
        selectedFacture.value = facture;
        updateFactureDialog.value = true;
    }

    /** Clic sur le bouton supprimer d'une facture */
    function removeFacture(facture: FullFactureType): void {
        selectedFacture.value = facture;
        deleteFactureDialog.value = true;
    }

    /** Calcul montant HT */
    function calculMontantHT(value: number, nbJours: number, isAvoir: boolean = false): number {
        const res = value * nbJours
        if (isAvoir)
            return -res
        return res
    }

    /** Calcul montant TTC */
    function calculMontantTTC(value: number, nbJours: number, isAvoir: boolean = false, tva: boolean = true): number{
        const res = calculMontantHT(value, nbJours, isAvoir)
        return tva ? res * 1.2 : res
    }

    /** Mise à jour du statut depuis le chip */
    function updateStatut(facture: FullFactureType, statut: StatutType[]): void {
        selectedFacture.value = facture;
        switch(statut[0].value) {
            case 'IMPAYEE':
                updateFactureDialog.value = true;
                break;
            case 'PAYEE':
                addDatePaiementDialog.value = true;
                break;
            default:
                selectedFacture.value = null;
        }
    }

    /** Sauvegarde d'une facture depuis le formulaire */
    async function saveFacture(facture: FactureType, statutValue: 'BROUILLON' | 'IMPAYEE'): Promise<void> {
        // Récupération du statut Impayée
        const statut: StatutType = await window.serviceElectron.getStatutByValue(statutValue);
        facture.statutId = statut.id;

        if (facture.id !== '') { // MàJ d'une facture existante
            await window.serviceElectron.updateFacture(JSON.stringify(facture));
            updateFactureDialog.value = false;
        } else { // Création de la nouvelle facture
            await window.serviceElectron.addFacture(JSON.stringify(facture));
            addFactureDialog.value = false;
        }
        
        // Actualisation du tableau
        await getYears();
        await getFacturesByYear();
    }

    /** Confirmation de la suppression d'une facture */
    async function deleteFacture(): Promise<void> {
        if (selectedFacture.value !== null) {
            await window.serviceElectron.deleteFacture(selectedFacture.value.id);
            await getYears();
            await getFacturesByYear();
        }
        deleteFactureDialog.value = false;
    }

    /** Ajout de la date de paiement pour passer une facture impayée à payée */
    async function addDatePaiement(date: Date): Promise<void> {
        if (selectedFacture.value !== null) {
            // Récupération du statut Payée
            const statut: StatutType = await window.serviceElectron.getStatutByValue('PAYEE');
            // MàJ de la facture
            const updatedFacture: FactureType = {
                id: selectedFacture.value.id,
                date: selectedFacture.value.date,
                tjm: selectedFacture.value.tjm,
                nbJours: selectedFacture.value.nbJours,
                entrepriseId: selectedFacture.value.entreprise.id,
                clientId: selectedFacture.value.client.id,
                tva: selectedFacture.value.tva,
                nbJoursPaiement: selectedFacture.value.nbJoursPaiement,
                isAvoir: selectedFacture.value.isAvoir,
                statutId: statut.id,
                datePaiement: date
            };
            await window.serviceElectron.updateFacture(JSON.stringify(updatedFacture));
            addDatePaiementDialog.value = false;

            // Actualisation du tableau
            await getYears();
            await getFacturesByYear();
        }
    }

    /** Récupères les factures de l'année sélectionnée */
    async function getFacturesByYear(): Promise<void> {
        factures.value = [];
        factures.value = await window.serviceElectron.getFullFacturesByYear(selectedYear.value);
    }

    /** Récupère les différentes années des factures enregistrées */
    async function getYears(): Promise<void> {
        const res = await window.serviceElectron.getAllFacturesYears();
        if (res.length > 0) {
            years.value = res;
            selectedYear.value = Math.max(...years.value);
        } else {
            const currentYear = getCurrentYear();
            years.value = [currentYear];
            selectedYear.value = currentYear;
        }
    }
</script>