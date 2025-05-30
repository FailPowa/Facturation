<template>
    <v-card class="pa-6">
        <v-card-title class="text-h5 text-center">{{ formTitle }}</v-card-title>
        <v-form
            v-model="formIsValid" 
            ref="formRef" 
            @submit.prevent="validateForm"
        >
            
            <v-text-field 
                v-model="entrepriseForm.nom"
                :rules="nomRules"
                label="Nom" 
                class="mb-3" 
            />
            <v-text-field 
                v-model="entrepriseForm.adresse" 
                :rules="adresseRules"
                label="Adresse" 
                class="mb-3" 
            />

            <v-row class="mb-3">
                <v-col cols="4">
                    <v-text-field 
                        v-model="entrepriseForm.codePostal" 
                        :rules="codePostalRules"
                        label="Code Postal" 
                    />
                </v-col>
                <v-col cols="8">
                    <v-text-field 
                        v-model="entrepriseForm.ville" 
                        :rules="villeRules"
                        label="Ville" 
                    />
                </v-col>
            </v-row>

            <v-text-field 
                v-model="entrepriseForm.mail" 
                :rules="mailRules"
                label="Mail" 
                class="mb-3" 
            />
            <v-text-field 
                v-model="entrepriseForm.numTva" 
                :rules="numTvaRules" 
                label="Numéro de TVA" 
                class="mb-3" 
            />
            <v-text-field 
                v-model="entrepriseForm.siret" 
                :rules="siretRules"
                label="SIRET" 
                class="mb-5" 
            />

            <v-row justify="center">
                <v-col cols="5">
                    <v-btn 
                        type="submit"
                        color="success"
                        block
                    >
                        Valider
                    </v-btn>
                </v-col>
                <v-col cols="5">
                    <v-btn 
                        color="error"
                        block
                        @click="cancelForm"
                    >
                        Annuler
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-card>
</template>

<script setup lang="ts">
    import { Ref, ref } from 'vue';
    import { Entreprise, EntrepriseType } from '../../../types';
    import {
        nomRules,
        adresseRules,
        codePostalRules,
        villeRules,
        mailRules,
        siretRules,
        numTvaRules
    } from '../../rules'

    /** Définition d'un paramètre du composant */
    const props = defineProps({
        formTitle: {
            type: String,
            required: true
        },
        entreprise: {
            type: [Entreprise, null],
            required: true
        }
    });
    
    /** Définition des événements */
    const emit = defineEmits([
        'cancel',
        'confirm'
    ]);

    /** Variables du formulaire */
    const formRef = ref();
    const formIsValid = ref(false);

    /** Variable contenant le titre du formulaire */
    const formTitle: Ref<string> = ref(props.formTitle)

    /** 
     * Variable contenant les champs du formulaire.
     * Si l'entreprise est null alors, la variable prend un comme valeur 
     * un objet de type EntrepriseType avec des attributs non remplis
     */
    const entrepriseForm : Ref<EntrepriseType> = ref({
        id: props.entreprise?.id ||-1,
        nom: props.entreprise?.nom || "",
        adresse: props.entreprise?.adresse || "",
        codePostal: props.entreprise?.codePostal || "",
        ville: props.entreprise?.ville || "",
        mail: props.entreprise?.mail || "",
        numTva: props.entreprise?.numTva || "",
        siret: props.entreprise?.siret || "",
        isMe: props.entreprise?.isMe || false
    });

    /**
     * Clic sur le bouton Annuler
     */
    function cancelForm(): void {
        emit('cancel');
    }

    /**
     * Clic sur le bouton Valider
     */
    async function validateForm(submitEventPromise: any): Promise<void>{
        const {valid, errors} = await submitEventPromise
        const entreprise = Object.assign({}, entrepriseForm.value) as EntrepriseType

        if (valid) {
            /** Assainissement des champs du formulaire */
            entreprise.nom = entreprise.nom.trim()
            entreprise.adresse = entreprise.adresse.trim()    
            entreprise.codePostal = entreprise.codePostal.replace(/ /g, '')
            entreprise.mail = entreprise.mail.replace(/ /g, '')
            entreprise.siret = entreprise.siret.replace(/ /g, '')
            entreprise.numTva = entreprise.numTva ? entreprise.numTva.replace(/ /g, ''): ""
            entreprise.ville = entreprise.ville.trim()

            /** Formattage des champs { ville, nom } */
            entreprise.mail = entreprise.mail.toLowerCase()
            entreprise.nom = entreprise.nom.toUpperCase()
            entreprise.ville = entreprise.ville.toUpperCase()

            /** Validation du formulaire et envoie des informations de l'entreprise */
            emit('confirm', entreprise)
        }else{
            console.log(errors)
        }
    }


</script>