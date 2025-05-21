<template>
    <v-card variant="outlined" class="d-flex pa-4 ga-4 ma-6">
        <p>TJM</p>
        <p>{{ formatMontantEuro(tjm.montant) }}</p>
        <v-btn
            icon
            size="x-small"
            variant="outlined"
            color="primary"
            @click="dialog = true"
        >
            <v-icon>{{ icons.mdiWrench }}</v-icon>
        </v-btn>
    </v-card>
    <v-dialog
        v-model="dialog"
        width="auto"
        persistent
    >
        <TjmDialog 
            :tjm-montant="tjm.montant" 
            @cancel="dialog = false"
            @confirm="updateTjm"
        />
    </v-dialog>
</template>
<script setup lang="ts">
    import { ref, Ref, onMounted } from 'vue';
    import { mdiWrench } from '@mdi/js';
    import { Tjm } from '../../../types';
    import { formatMontantEuro } from '../../../plugins/formatMontantEuro';
    import TjmDialog from '../dialogs/TjmDialog.vue';

    /** Variable contenant les icones du composant */
    const icons = ref({
        mdiWrench
    });

    /** Variable contenant le TJM enregistré */
    const tjm: Ref<Tjm> = ref({} as Tjm);

    /** Variable du dialog */
    const dialog: Ref<boolean> = ref(false);

    /** Appel de notre service au chargement de la page */
    onMounted(async () => {
        getTjm();
    });

    /** Récupère le TJM enregistré */
    async function getTjm(): Promise<void> {
        tjm.value = await window.serviceElectron.getTjm();
    }

    /** Met à jour le montant du TJM enregistré */
    async function updateTjm(montant: number): Promise<void> {
        tjm.value = await window.serviceElectron.updateTjm(montant);
        dialog.value = false;
    }
</script>