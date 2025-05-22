<template>
    <!-- Test 1-->
    <v-container
        fluid 
        class="d-flex flex-column ga-12"
    >
        <p class="text-h3 text-center">Bienvenue {{ monEntreprise.nom }} !</p>

        <!-- Onglets -->
        <v-tabs
            v-model="tab"
            align-tabs="center"
            color="deep-purple-accent-4"
        >
            <v-tab :value="1">Tableau de factures</v-tab>
            <v-tab :value="2">Chiffre d'affaires</v-tab>
        </v-tabs>

        <!-- Contenu des onglets -->
        <v-tabs-window v-model="tab">
            <!-- Onglet 1 : Tableau -->
            <v-tabs-window-item :value="1">
                <FacturesTable 
                    :no-action="false"
                    :no-select-year="true"
                    @update:factures="onFactureUpdate"
                />
            </v-tabs-window-item>

            <!-- Onglet 2 : Graphique -->
            <v-tabs-window-item :value="2">
                <v-container  class="d-flex justify-center">
                    <v-card width="70%">
                        <FactureChart :factures="factures"/>
                    </v-card>
                </v-container>
            </v-tabs-window-item>
        </v-tabs-window>
    </v-container>
</template>

<script setup lang="ts">
    import { onMounted, onUpdated, Ref, ref } from 'vue'
    import FacturesTable from '../tables/FacturesTable.vue'
    import FactureChart from '../charts/FactureChart.vue'
    import { EntrepriseType, FullFactureType } from '../../../types'

    /** Variable contenant la valeur de la page affiché par le composant Tabs */
    const tab = ref(1);

    /** Variable contenant les factures */
    const factures: Ref<FullFactureType[]> = ref([]);

    /** Variable contenant les informations sur votre entreprise */
    const monEntreprise: Ref<EntrepriseType> = ref({} as EntrepriseType); 

    /** Récupère votre entrerpise */
    onMounted(async () => {
        await getMonEntreprise();
    });

    /** Récupère votre entrerpise */
    onUpdated(async () => {
        await getMonEntreprise();
    });


    /**
     * Met à jour la liste des factures utilisée par le graphique
     * à partir des données émises par le composant FacturesTable.
     *
     * @param {Array<FullFactureType>} newFactures - Nouvelle liste de factures après filtrage ou modification.
     */
    function onFactureUpdate(newFactures: FullFactureType[]){
        factures.value = [];
        factures.value = newFactures;
    }

    /** Récupère votre entreprise */
    async function getMonEntreprise() {
        const result = await window.serviceElectron.getMonEntreprise();
        monEntreprise.value = Object.assign({}, result)
    }
</script>
