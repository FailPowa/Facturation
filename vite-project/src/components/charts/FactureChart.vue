<template>
  <v-container>
        <v-row>
            <v-col cols="12">
                <p class="text-h5 ">
                    Évolution du chiffre d'affaires par mois en {{ year }} (à changer)
                </p>
            </v-col>
        </v-row>
        <v-row justify-md="center">
            <v-col>
                <Line
                    :data="chartData" 
                    :options="options"
                />
            </v-col>
        </v-row>
  </v-container>
</template>


<script setup lang="ts">
    import { ref, Ref, computed, onMounted, onUpdated, onBeforeUnmount } from 'vue';
    import { Line } from 'vue-chartjs';
    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        LineElement,
        PointElement,
        CategoryScale,
        LinearScale,
        Colors
    } from 'chart.js';
    import { FullFactureType } from '../../../types';

    /** Paramètres du composant */
    const props = defineProps({
        factures: { type: Array<FullFactureType>, required: true }
    })

    /** Variables contenant les factures */
    const factures: Ref<FullFactureType[]> = ref([])

    /** Active les composants nécessaires pour afficher le graphique */
    ChartJS.register(Title, Tooltip, Legend, Colors, LineElement, PointElement, CategoryScale, LinearScale)
    
    const chartRef = ref()

    /** Variable contenant l'année des factures */
    const year = ref(NaN);

    /** Variable contenant les mois */
    const months = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ]

    /** Options d'affichage du graphique */
    const options = {
        responsive: true,
        maintainAspectRatio: false
    }

    /**
     * Configuration du graphique linéaire
     */
    const chartData = computed(() => {
        const sortedFactures = factures.value.sort((a, b) => a.date.getTime() - b.date.getTime());

        // Récupérer les mois (abrégés) pour chaque facture
        const monthsLabels = sortedFactures.map(facture =>
            months[facture.date.getMonth()]
        );

        // Factures payés et impayés
        const dataFactures = sortedFactures.map(facture => {
            const montantHT = facture.tjm * facture.nbJours;
            return facture.tva ? montantHT * 1.2 : montantHT;
        })

        // Factures payés seulement
        const dataFacturesSansImpayes = sortedFactures
        .filter(facture => facture.statut.value === "PAYEE")
        .map(facture => {
            const montantHT = facture.tjm * facture.nbJours;
            return facture.tva ? montantHT * 1.2 : montantHT;
        });

        return {
            labels: monthsLabels,
            datasets: [
                {
                    label: `Factures ${year.value} (Sans les factures impayés)`,
                    data: dataFacturesSansImpayes,
                    fill: false,
                    tension: 0.3
                },
                {
                    label: `Factures ${year.value} (Avec les factures impayés)`,
                    data: dataFactures,
                    fill: false,
                    tension: 0.3
                }
            ]
        };
    });


    /** Ajoute à l'évènement 'resize' la fonction onResize pour mettre à jour la taille du graphique */
    onMounted(() => {
        window.addEventListener('resize', onResize)
    })

    /** Retire l'évènement lorsque le composant est démonté */
    onBeforeUnmount(() => {
        window.removeEventListener('resize', onResize)
    })

    /**
     * Initialise la liste des factures et définit l’année affichée 
     * à partir de la première facture lors du montage du composant.
     */
    onMounted(() => {
        factures.value = props.factures;
        if (factures.value.length > 0){
            year.value = factures.value[0].date.getFullYear();
        }
    });

    /** Met à jour les factures et l'année selectionné */
    onUpdated(() => {
        factures.value = props.factures;
        if (factures.value.length > 0){
            year.value = factures.value[0].date.getFullYear();
        }
    });

    /** Met à jour la taille du graphique lorsque la fenetre change de taille */
    function onResize() {
        if(chartRef.value) {
            chartRef.value.chartInstance.update()
        }
    }

</script>

