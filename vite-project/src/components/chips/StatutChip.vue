<template>
    <v-menu>
        <template #activator="{ props }">
            <v-chip
                v-bind="props"
                :color="statut.color"
                variant="flat" 
            >
                {{ statut.text }}
            </v-chip>
        </template>
        <v-list
            v-if="nextStatut.length > 0"
            :items="nextStatut"
            item-title="text"
            density="compact"
            return-object
            @update:selected="updateStatut"
        />
    </v-menu>
</template>
<script setup lang="ts">
    import { onMounted, ref, Ref } from 'vue';
    import { StatutType } from '../../../types';

    /** Props */
    const componentProps = defineProps({
        statut: {
            type: Object,
            required: true
        }
    });

    /** Evénements */
    const emit = defineEmits(['update-statut']);

    /** Prochain statut pouvant être sélectionné */
    const nextStatut: Ref<StatutType[]> = ref([]);

    onMounted(async () => {
        await getStatuts();
    });

    /** Changement de statut */
    function updateStatut(selected: unknown): void {
        emit('update-statut', selected);
    }

    /** Récupération des statuts & setup du prochain statut disponible */
    async function getStatuts(): Promise<void> {
        const statuts = await window.serviceElectron.getStatuts();

        switch(componentProps.statut.value) {
            case 'BROUILLON':
                nextStatut.value = statuts.filter((s: StatutType) => s.value === 'IMPAYEE');
                break;
            case 'IMPAYEE':
                nextStatut.value = statuts.filter((s: StatutType) => s.value === 'PAYEE');
                break;
            default:
                nextStatut.value = [];
        }
    }

</script>