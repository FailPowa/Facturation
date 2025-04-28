<template>
    <v-card class="pa-6">
        <v-card-title class="text-h5 text-center">{{ formTitle }}</v-card-title>
        <v-form fast-fail ref="formRef" v-model="formIsValid" @submit.prevent="confirmDialog">
            <v-text-field v-model="entrepriseForm.nom" label="Nom" class="mb-3" />
            <v-text-field v-model="entrepriseForm.adresse" label="Adresse" class="mb-3" />

            <v-row class="mb-3">
                <v-col cols="4">
                <v-text-field v-model="entrepriseForm.codePostal" label="Code Postal" />
                </v-col>
                <v-col cols="8">
                <v-text-field v-model="entrepriseForm.ville" label="Ville" />
                </v-col>
            </v-row>

            <v-text-field v-model="entrepriseForm.mail" label="Mail" class="mb-3" />
            <v-text-field v-model="entrepriseForm.numTva" label="Numéro de TVA" class="mb-3" />
            <v-text-field v-model="entrepriseForm.siret" label="SIRET" class="mb-5" />

            <v-row justify="center">
                <v-col cols="5">
                <v-btn type="submit" color="success" block>Valider</v-btn>
                </v-col>
                <v-col cols="5">
                <v-btn color="error" block @click="exitDialog">Annuler</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-card>
</template>

<script setup lang="ts">
    import { Ref, ref } from 'vue';
    import { Entreprise, EntrepriseType } from '../../../types/EntrepriseType';

    /** Variables du formulaire */
    const formRef = ref();
    const formIsValid = ref(false);

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

    /** Définition des événements */
    const emit = defineEmits([
        'cancel',
        'confirm'
    ]);

    /**
     * Clic sur le bouton Annuler
     */
    function exitDialog(): void {
        emit('cancel');
    }

    /**
     * Clic sur le bouton Valider
     */
    async function confirmDialog(submitEventPromise: any): Promise<void>{
        const {valid, errors} = await submitEventPromise
        const entreprise = Object.assign({}, entrepriseForm.value) as EntrepriseType
        if (valid) {
            emit('confirm', entreprise)
        }else{
            console.log(errors)
        }
    }

</script>