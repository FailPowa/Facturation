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
    import { validateSiret } from '../../../plugins/validateSiret'

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
    const entrepriseForm : Ref<EntrepriseType> = props.entreprise !== null ? ref(props.entreprise) : ref({
        id: -1,
        nom: "",
        adresse: "",
        codePostal: "",
        ville: "",
        mail: "",
        numTva: "",
        siret: "",
        isMe: false
    });

    /** Variables contenant les regex de différents à respecter */
    const mailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    const siretRegex = new RegExp(/^[\d\s]+$/)
     

    /** Règles de validation des informations de l'entreprise */
    
    const nomRules = [
        /** Règle: Le nom de l'entreprise est requis */
        (value: string) => value.trim().length !== 0? true : "Le nom de l'entreprise est requis.",
    ]
    const adresseRules = [
        /** Règle: L'adresse de l'entreprise est requis */
        (value: string) => value.trim().length !== 0? true : "L'adresse de l'entreprise est requise."
    ]
    const codePostalRules = [
        /** Règle: Le code postal est requis */
        (value: string) => value.trim().length !== 0? true : "Le code postal de l'entreprise est requis."
    ]
    const villeRules = [
        /** Règle: Le nom de la ville d'entreprise est requis */
        (value: string) => value.trim().length !== 0? true : "La ville de l'entreprise est requise."
    ]
    const mailRules = [
        /** Règle: Le mail de l'entreprise est requis */
        (value: string) => value.trim().length !== 0? true : "Un mail est requis.",
        
        /** Règle: L'email respecte le format suivant => anything@anything.anything */
        (value: string) => mailRegex.test(value.trim())? true : "Le mail est invalide."
    ]
    const siretRules = [
        /** Règle: Le numéro de siret de l'entreprise est requis */
        (value: string) => value.trim().length !== 0? true : "Le numéro de SIRET de l'entreprise est requis.",

        /** Règle: Le numéro de siret de l'entreprise est invalide */
        (value: string) => siretRegex.test(value.replace(' ', ''))? true : "Le numéro de siret est invalide.",

        /** Règle: Le numéro de siret de l'entreprise ne respecte pas l'algorithme de Luhn */
        (value: string) => validateSiret(value.replace(' ', ''))? true : "Le numéro de siret ne respecte pas l'algorithme de Luhn."
    ]
    const numTvaRules = [
        /** Règle: Le numéro de tva de l'entreprise doit contenir 13 caractères ou rien. */
        (value: string) => ( !value || value.replace(' ', '').length === 13) || "Le numéro de TVA est invalide."
    ]
    

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
            /** Assainissement des champs des formulaires */

            entreprise.nom = entreprise.nom.trim()
            entreprise.adresse = entreprise.adresse.trim()    
            entreprise.codePostal = entreprise.codePostal.replace(' ', '')
            entreprise.mail = entreprise.mail.replace(' ', '')
            entreprise.siret = entreprise.siret.replace(' ', '')
            entreprise.numTva = entreprise.numTva ? entreprise.numTva.replace(' ', ''): ""
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