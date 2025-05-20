<template>
  <v-container>
        <v-row>
            <v-col cols="12">
                <p class="text-h6 ">
                    Évolution du chiffre d'affaires par mois en {{ year }}
                </p>
            </v-col>
        </v-row>
        <v-row align-content="center">
            <v-col cols="10">
                <Line
                    :data="chartData" 
                />
            </v-col>
        </v-row>
  </v-container>
</template>


<script setup lang="ts">
    import { ref, Ref, computed, onMounted, onUpdated } from 'vue'
    import { Line } from 'vue-chartjs'
    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        LineElement,
        PointElement,
        CategoryScale,
        LinearScale
    } from 'chart.js'
    import { FullFactureType } from '../../../types';

    /** Paramètres du composant */
    const props = defineProps({
        factures: { type: Array<FullFactureType>, required: true }
    })

    /** Variables contenant les factures */
    const factures: Ref<FullFactureType[]> = ref([])

    /** Active les composants nécessaires pour afficher le graphique */
    ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

    /** Variable contenant l'année des factures */
    const year = ref(NaN);

    /** Variable contenant les mois */
    const months = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    '   Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ]

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

    /**
     * Calcule l'évolution du chiffres d'affaires par mois 
     * et renvoie le résultat sous forme de liste
     * @returns {Array<number>} : Liste contenant l'évolution du CA sur les 12 mois de l'année
     */
    function getCAperMonth(): number[]{
        /** L'évolution du chiffre d'affaire par mois */
        const caPerMonth: number[] = Array(12).fill(0)
        /**  */
        caPerMonth.reduce((yearCA: number, _value: number, currentMonth: number) => {
            /** Factures du mois courant */
            const monthFactures = factures.value.filter(facture => facture.date.getMonth() === currentMonth);
            
            /** Chiffre d'affaires du mois */
            let monthCA = monthFactures.map(facture => {
                let montantHT = facture.tjm * facture.nbJours
                return facture.tva ? montantHT * 1.2 : montantHT 
            }).reduce((total: number, currentValue: number) => total + currentValue, 0)
            
            /** Ajoute le CA des prestations des mois précédent au CA du mois courant */
            caPerMonth[currentMonth] = yearCA + monthCA
            return yearCA + monthCA
        }, 0)
        return caPerMonth
    }

    /**
     * Configuration du graphique linéaire
     */
    const chartData = computed(() => {
        let caEvolution = getCAperMonth()
        return {
            labels: months,
            datasets: [
                {
                    label: `Chiffre d'Affaires ${year.value}`,
                    backgroundColor: '#1976D2',
                    borderColor: '#1976D2',
                    data: caEvolution,
                    fill: false,
                    tension: 0.3
                }
            ]
        }
    })
</script>

