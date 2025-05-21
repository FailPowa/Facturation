<template>
    <!-- Test 1-->
    <v-container
        v-if="false"
        fluid 
        class="d-flex flex-md-column ga-4"
    >
        <p class="text-h3 text-center font-weight-bold">Bienvenue {{ monEntreprise.nom }} !</p>

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
                <FactureChart :factures="factures"/>
            </v-tabs-window-item>
        </v-tabs-window>
    </v-container>

    <!-- Test 2-->
<v-container v-if="true" fluid>
    <v-row justify-md="center" class="mb-8">
        <p class="text-h3 text-center font-weight-bold" style="letter-spacing: 0.05em;">
            Bienvenue {{ monEntreprise.nom }} !
        </p>
    </v-row>

    <!-- Carte avec ombre et arrondi contenant tableau + graphique -->
    <v-row justify-md="center">
        <v-card
            elevation="6"
            style="width: 90%; padding: 24px; border-radius: 12px;"
        >
            <v-row>
                <FacturesTable 
                    :no-action="false"
                    :no-select-year="true"
                    @update:factures="onFactureUpdate"
                />
            </v-row>

            <v-divider class="my-8" />

            <v-row>
                <FactureChart :factures="factures"/>
            </v-row>
        </v-card>
    </v-row>
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
