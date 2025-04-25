<template>
    <v-sheet class="mx-auto" width="300">
        <v-form fast-fail ref="formRef" v-model="formIsValid" @submit.prevent="confirmDialog">
            <v-text-field
                v-model="form.firstname"
                label="First name"
            ></v-text-field>

            <v-text-field
                v-model="form.lastname"
                :rules="lastnameRules"
                label="Last name"
            ></v-text-field>

            <v-btn class="mt-2" type="submit" block>Submit</v-btn>
            <v-btn
                color="error"
                @click="exitDialog"
            >
                Annuler
            </v-btn>
        </v-form>
    </v-sheet>
</template>

<script setup lang="ts">
    import { Ref, ref } from 'vue';
    import { ClientType } from '../../../types/ClientType'

    /** Variables du formulaire */
    const formRef = ref();
    const formIsValid = ref(false);

    /** Variable contenant les champs du formulaire */
    const form : Ref<ClientType> = ref({
        firstname: "",
        lastname: ""
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
        if (valid) {
            emit('confirm', form.value)
        }else{
            console.log(errors)
        }
    }

</script>