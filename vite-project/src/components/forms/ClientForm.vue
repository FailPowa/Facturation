<template>
<v-card class="pa-6">
      <v-card-title class="text-h6 text-center">Créer un nouveau client</v-card-title>
      <v-form fast-fail ref="formRef" v-model="formIsValid" @submit.prevent="confirmDialog">
        <v-text-field v-model="clientForm.nom" label="Nom" class="mb-3" />
        <v-text-field v-model="clientForm.adresse" label="Adresse" class="mb-3" />

        <v-row class="mb-3">
          <v-col cols="6">
            <v-text-field v-model="clientForm.codePostal" label="Code Postal" />
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="clientForm.ville" label="Ville" />
          </v-col>
        </v-row>

        <v-text-field v-model="clientForm.mail" label="Mail" class="mb-3" />
        <v-text-field v-model="clientForm.numTva" label="Numéro de TVA" class="mb-3" />
        <v-text-field v-model="clientForm.siret" label="SIRET" class="mb-5" />

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
    import { Client, ClientType } from '../../../types/ClientType';

    /** Variables du formulaire */
    const formRef = ref();
    const formIsValid = ref(false);

    /** Définition d'un paramètre du composant */
    const props = defineProps({
        client: {
            type: [Client, null],
            required: true
        }
    });

    /** 
     * Variable contenant les champs du formulaire.
     * Si le client est null alors, la variable prend un comme valeur 
     * un objet de type ClientType avec des attributs non remplis
     */
    const clientForm : Ref<ClientType> = props.client !== null ? ref(props.client) : ref({
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
        const newClient = Object.assign({}, clientForm.value) as ClientType
        if (valid) {
            emit('confirm', newClient)
        }else{
            console.log(errors)
        }
    }

</script>