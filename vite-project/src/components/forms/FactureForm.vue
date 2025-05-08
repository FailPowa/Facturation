<template>
    <v-form
        v-model="formIsValid" 
        ref="formRef"
        @submit.prevent="validateForm"
    >
        <v-card>
            <v-card-title
                class="d-flex justify-center text-h4 ma-3"
            >
                {{ props.formTitle }}
            </v-card-title>
            <v-container
                class="d-flex"
            >
                <v-container
                    width="50%"
                >
                    <v-text-field
                        v-model="facture.nbJours"
                        :rules="nbJoursRules"
                        label="Nombre de jours travaillés"
                        type="number"
                        variant="outlined"
                    ></v-text-field>
                    <v-text-field
                        v-model="facture.tjm"
                        label="TJM"
                        type="number"
                        variant="outlined"
                        disabled
                    ></v-text-field>
                    <v-autocomplete
                        v-model="facture.clientId"
                        :items="clients"
                        :rules="clientRules"
                        item-title="nom"
                        item-value="id"
                        variant="outlined"
                        label="Nom du client"
                    >
                        <template v-slot:item="{ props, item }">
                            <v-list-item
                                v-bind="props"
                                :title="item.raw.nom"
                            ></v-list-item>
                        </template>
                    </v-autocomplete>
                    <v-text-field
                        v-model="facture.nbJoursPaiement"
                        :rules="conditionPaiementRules"
                        label="Condition de paiement (en nombre de jours)"
                        variant="outlined"
                        type="number"
                    >

                    </v-text-field>
                    <v-checkbox
                        v-model="facture.tva"
                        label="La facture doit inclure la TVA ?"
                    ></v-checkbox>
                    <v-checkbox 
                        v-model="facture.isAvoir"
                        label="Le document est un avoir ?"
                    ></v-checkbox>
                </v-container>
                <v-container 
                    width="50%"
                    class="d-flex justify-center"
                >                    
                    <v-date-picker
                        v-model="facture.date"
                        color="secondary"
                    >
                    </v-date-picker>
                </v-container>
            </v-container>
            <v-card-actions
                class="d-flex flex-wrap justify-center mb-2 "
            >
                <!-- Bouton valider formulaire -->
                <v-btn
                    color="success"
                    variant="flat"
                    width="auto"
                    @click="validateForm"
                >
                    Valider
                </v-btn>

                <!-- Bouton enregistrer brouillon -->
                <v-btn
                    color="warning"
                    variant="flat"
                    width="auto"
                    @click="saveBrouillon"
                >
                    Sauvegarder Brouillon
                </v-btn>

                <!-- Bouton générer le pdf du formulaire -->
                <v-btn
                    color="info"
                    variant="flat"
                    width="auto"
                    @click="generatePDF"
                >
                    Générer un pdf
                </v-btn>

                <!-- Bouton annuler-->
                <v-btn
                    color="error"
                    variant="flat"
                    width="auto"
                    @click="cancelForm"
                >
                    Annuler
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
    
</template>


<script setup lang="ts">
    import { onMounted, ref, Ref} from 'vue';
    import { FullFacture, FactureType, EntrepriseType, Tjm } from '../../../types';
    import {
        nbJoursRules,
        clientRules,
        conditionPaiementRules
    } from '../../rules';

    /** Définition d'un paramètre du composant */
    const props = defineProps({
        formTitle: {
            type: String,
            required: true
        },
        facture: {
            type: [FullFacture, null],
            required: true
        }
    });
    
    /** Définition des événements */
    const emit = defineEmits([
        'save',
        'cancel',
        'confirm',
        'generatePdf'
    ]);

    /** Variables du formulaire */
    const formIsValid = ref(false)
    const formRef = ref()

    /** Variable contenant les entreprises clientes */
    const clients : Ref<EntrepriseType[]> = ref([]);

    /** Variable contenant les informations 
     * sur la facture en cours de création ou de modification 
     */
    const facture : Ref<FactureType> = ref({
        id: "",
        isAvoir: false,
        date: new Date(Date.now()),
        tjm: 0,
        nbJours: 0,
        entrepriseId: 1,
        clientId: -1,
        tva: true,
        nbJoursPaiement: 0,
        statutId: 1,
        datePaiement: null
    });

    /**
     * Récupération des clients et du TJM
     * Récupération de la facture si le props.facture est non-null
     */
    onMounted(async () => {
        await getClients();
        await getTjm();
        if (props.facture !== null){
            facture.value = {
                id: props.facture.id,
                isAvoir: props.facture.isAvoir,
                date: props.facture.date,
                tjm: props.facture.tjm,
                nbJours: props.facture.nbJours,
                entrepriseId: props.facture.entreprise.id,
                clientId: props.facture.client.id,
                tva: props.facture.tva,
                nbJoursPaiement: props.facture.nbJoursPaiement,
                statutId: props.facture.statut.id,
                datePaiement: null
            }
        }
    })

    /**
     * Clic sur le bouton Annuler
     */
     function cancelForm(): void {
        emit('cancel');
    }

    /**
     * Clic sur le bouton Valider
     */
    async function validateForm(): Promise<void> {
        const { valid } = await formRef.value.validate();
        if (valid){
            emit('confirm', facture);
            return
        }else{
            console.log('Formulaire invalide')
        }
    }

    /**
     * Clic sur le bouton Brouillon
     */
    function saveBrouillon(): void{
        emit('save', facture);
    }

    /**
     * Clic sur le bouton Generer pdf
     */
    function generatePDF(): void{
        emit('generatePdf')
    }

    /** Récupère les clients */
    async function getClients(){
        clients.value = (await window.serviceElectron.getClients());
    }

    /** Récupère le TJM enregistré */
    async function getTjm(): Promise<void> {
        const tjm: Tjm = await window.serviceElectron.getTjm();
        facture.value.tjm = tjm.montant
    }
</script>