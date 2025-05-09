<template>
    <v-menu>
        <template #activator="{ props }">
            <v-chip 
                v-bind="props"
                :color="facture.statut.color"
                variant="flat"
            >
                {{ facture.statut.text }}
            </v-chip>
        </template>
        <v-list
            v-if="nextStatut !== null"
            density="compact"
            @update:selected="updateStatutEvent"
        >
            <v-list-item
                :key="nextStatut.id"
                :value="nextStatut.value"
                :title="nextStatut.text"
                :color="nextStatut.color"
            />
        </v-list>
    </v-menu>
</template>


<script setup lang="ts">
    import { onMounted, ref, Ref } from 'vue';
    import { StatutType, FullFactureType, FullFacture } from '../../../types';


    /** Paramètres du composant */
    const props = defineProps({
        facture : { type: FullFacture, required: true }
    })


    /** Définition des événements */
    const emits = defineEmits([
        'updateStatut',
        'addDatePayment'
    ])
    
    /** Variable contenant tous les statuts */
    const allStatuts: Ref<StatutType[]> = ref([]);

    /** Variable contenant la facture */
    const facture: Ref<FullFactureType> = ref(props.facture);

    /** Variable contenant le prochain statut 
     * pouvant être selectionné par l'utilisateurù
     * ex: Si le statut de la facture est 'Impayée' alors, nextStatut proposera le statut suivant 'Payée'
     *  */
    const nextStatut: Ref<StatutType | null> = ref(null)
    
    /** Récupère les statuts lors du chargement de la page */
    onMounted(async () => {
        await getStatuts();
        const statut = facture.value.statut
        nextStatut.value = allStatuts.value.find( 
            (element: StatutType) => element.id === statut.id + 1
        ) || null
    })

    /** Evenement changement de statut */
    async function updateStatutEvent() {
        if (nextStatut.value?.id === 2){
            emits('updateStatut')
        } else if (nextStatut.value?.id === 3){
            emits('addDatePayment')
        }
    }

    /** Récupère les différents statuts pour les factures */
    async function getStatuts() {
        allStatuts.value = (await window.serviceElectron.getStatuts());
    }
</script>