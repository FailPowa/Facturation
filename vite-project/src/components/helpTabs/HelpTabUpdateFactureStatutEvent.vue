<template>
    <v-card
        flat
        :title="title"
    >
        <v-card-text class="help-text">
            <br />
            <h3>
                <v-icon :icon="icons.mdiInvoiceMultipleOutline" />
                Depuis l'onglet Factures
            </h3>
            <br />
            <p>
                Dans l'onglet des factures, les boutons suivants sont disponibles dans la section <strong>Statut</strong> de la table :
            </p>

            <v-container class="d-flex ga-4">
                <StatutChip v-for="statut in statuts" :statut="statut" />
            </v-container>

            <br />

            <ul>
                <li>
                    <strong>Brouillon</strong> : Cliquer sur ce statut ouvre une fenêtre permettant de compléter 
                    les informations de la facture (comme la date, le nombre de jours travaillés, le client, etc.). 
                    Ce formulaire est similaire à celui utilisé lors de la modification d'une facture. 
                    Ce statut indique qu'il manque encore des informations pour valider la facture.
                </li>
                <br />
                <li>
                    <strong>Impayée</strong> : Ce statut peut être atteint soit après avoir complété une facture en "Brouillon", 
                    soit directement lors de la création d'une facture complète. 
                    Cliquer dessus permet de faire apparaître une liste pour éventuellement passer au statut "Payée".
                </li>
                <br />
                <li>
                    <strong>Payée</strong> : Lorsqu'on clique dessus depuis une facture marquée "Impayée", 
                    une fenêtre s'ouvre pour saisir et confirmer la <strong>date du paiement</strong>. 
                    Une fois validée, le statut de la facture est mis à jour en "Payée".
                </li>
            </ul>

            <br />
            <v-divider />
            <br />

            <h3>
                <v-icon :icon="icons.mdiHomeOutline" />
                Depuis la page d'Accueil
            </h3>
            <br />
            <p>
                Depuis la page d'Accueil, les mêmes boutons sont accessibles dans la section <strong>Statut</strong> du tableau des factures, en haut à gauche.
            </p>
            <p>
                Leur comportement est identique à celui de l'onglet Factures. Chaque clic sur un bouton de statut permet d'effectuer l'action correspondante (compléter la facture, passer au statut suivant, ou confirmer un paiement).
            </p>
            <br />
        </v-card-text>

    </v-card>
</template>
<script setup lang="ts">
    import { onBeforeMount, ref, Ref } from 'vue';
    import { 
        mdiInvoiceMultipleOutline,
        mdiHomeOutline
    } from '@mdi/js';
    import StatutChip from '../chips/StatutChip.vue';
import { StatutType } from '../../../types';

    const title: Ref<string> = ref('Comment ajouter une facture ?');
    const icons = ref({
        mdiInvoiceMultipleOutline,
        mdiHomeOutline
    });
    // La liste des statuts
    const statuts: Ref<StatutType[]> = ref([]);
    
    // Récupère les statuts
    onBeforeMount(async () =>{
        statuts.value = await window.serviceElectron.getStatuts()
    })
</script>
<style scoped>
.help-text {
    text-align: start;
    margin-left: 5%;
}
</style>