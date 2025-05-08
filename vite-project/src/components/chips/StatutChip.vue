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

    const props = defineProps({
        facture : { type: FullFacture, required: true }
    })

    const emits = defineEmits([
        'updateStatut',
        'addDatePayment'
    ])

    const allStatuts: Ref<StatutType[]> = ref([]);
    const facture: Ref<FullFactureType> = ref(props.facture);
    const nextStatut: Ref<StatutType | null> = ref(null)
    
    
    onMounted(async () => {
        await getStatuts();
        const statut = facture.value.statut
        nextStatut.value = allStatuts.value.find( 
            (element: StatutType) => element.id === statut.id + 1
        ) || null
    })

    async function updateStatutEvent(){
        if (nextStatut.value?.id === 2){
            emits('updateStatut')
        } else if (nextStatut.value?.id === 3){
            emits('addDatePayment')
        }
    }

    async function getStatuts(){
        allStatuts.value = (await window.serviceElectron.getStatuts());
    }
</script>