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
                        ref="clientFieldRef"
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
                        v-model.number="facture.nbJoursPaiement"
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
                        elevation="3"
                        bg-color="surface-bright"
                        
                    >
                    </v-date-picker>
                </v-container>
            </v-container>
            <v-card-actions
                class="d-flex flex-wrap justify-center mb-2 "
            >
                <v-row>
                    <!-- Bouton valider formulaire -->
                    <v-col>
                        <v-btn
                            color="success"
                            variant="flat"
                            block
                            @click="validateForm(false)"
                        >
                            Valider
                        </v-btn>
                    </v-col>
                    
                    <!-- Bouton enregistrer brouillon -->
                    <v-col>
                        <v-btn
                            color="warning"
                            variant="flat"
                            block
                            @click="saveBrouillon"
                        >
                            Sauvegarder Brouillon
                        </v-btn>
                    </v-col>

                    <!-- Bouton générer le pdf du formulaire -->
                    <v-col>
                        <v-btn
                            color="info"
                            variant="flat"
                            block
                            @click="validateForm(true)"
                        >
                            Générer un pdf
                        </v-btn>
                    </v-col>

                    <!-- Bouton annuler-->
                    <v-col>
                        <v-btn
                            color="error"
                            variant="flat"
                            block
                            @click="cancelForm"
                        >
                            Annuler
                        </v-btn>
                    </v-col>
                </v-row>
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

    /** Variable du champs client */
    const clientFieldRef = ref()

    /** Variable contenant les entreprises clientes */
    const clients : Ref<EntrepriseType[]> = ref([]);

    // Par défaut, la date de facturation correspond au dernier jour du mois 
    const date = new Date();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    /** Variable contenant les informations 
     * sur la facture en cours de création ou de modification 
     */
    const facture : Ref<FactureType> = ref({
        id: "",
        isAvoir: false,
        date: lastDay,
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
     * Récupération de la facture si le paramètres 'facture' est non-null
     */
    onMounted(async () => {
        await getClients();
        await getTjm();
        if (props.facture !== null){
            // Convertit la facture complète (FullFacture) en facture simple (Facture)
            facture.value = {
                id: props.facture.id,
                isAvoir: props.facture.isAvoir,
                date: props.facture.date,
                tjm: props.facture.tjm,
                nbJours: props.facture.isAvoir ? -1 * props.facture.nbJours : props.facture.nbJours,
                entrepriseId: props.facture.entreprise.id,
                clientId: props.facture.client.id,
                tva: props.facture.tva,
                nbJoursPaiement: props.facture.nbJoursPaiement,
                statutId: props.facture.statut.id,
                datePaiement: null
            }
        } else {
            const lastFacture = await getLastFacture();
            facture.value.clientId = lastFacture.clientId;
            facture.value.nbJoursPaiement = lastFacture.nbJoursPaiement;
        }
    })

    /**
     * Clic sur le bouton Annuler
     */
     function cancelForm(): void {
        emit('cancel');
    }

    /**
     * Clic sur le bouton Valider ou Generer pdf
     */
    async function validateForm(isPdf : boolean): Promise<void> {
        /** Verifie si les champs du formulaire respectent les règles définies */
        const { valid, errors } = await formRef.value.validate();
        if (valid){
            /** Convertit les valeurs numériques en type number 
             *  car elles sont renvoyés au format string par le formulaire.
             */
            facture.value.nbJours = facture.value.isAvoir ? -1 * Number(facture.value.nbJours) : Number(facture.value.nbJours)
            // facture.value.nbJours = Number(facture.value.nbJours)
            facture.value.nbJoursPaiement = Number(facture.value.nbJoursPaiement)
            facture.value.tjm = Number(facture.value.tjm)
            emit(isPdf ? 'generatePdf' : 'confirm', facture.value);
        }else{
            console.log('Formulaire invalide', errors)
        }
    }

    /**
     * Clic sur le bouton Brouillon
     */
    async function saveBrouillon(): Promise<void> {
        /** Verifie si le champ client est valide avant l'enregistrement de la facture */
        const isValid = await clientFieldRef.value.validate?.()
        if (isValid.length === 0){
            /** Convertit les valeurs numériques en type number 
             *  car elles sont renvoyés au format string par le formulaire.
             */
            facture.value.nbJours = Number(facture.value.nbJours)
            facture.value.nbJoursPaiement = Number(facture.value.nbJoursPaiement)
            facture.value.tjm = Number(facture.value.tjm)
            emit('save', facture.value);
        }else{
            console.log('Impossible de sauvegarder le brouillon sans client enregistré.')
        }
        
    }

    /** Récupère les clients */
    async function getClients() {
        clients.value = (await window.serviceElectron.getClients());
    }

    /** Récupère le TJM enregistré */
    async function getTjm(): Promise<void> {
        const tjm: Tjm = await window.serviceElectron.getTjm();
        facture.value.tjm = tjm.montant
    }

    async function getLastFacture(): Promise<FactureType> {
        const facture: FactureType = await window.serviceElectron.getLastFacture();
        return facture
    }
</script>