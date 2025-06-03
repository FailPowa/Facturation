<template>
    <v-card
        flat
        :title="title"
    >
        <v-card-text class="help-text">
            <br />
            <h3>
                <v-icon :icon="icons.mdiCashMultiple" size="large" />
                Modifier votre TJM (Taux Journalier Moyen)
            </h3>
            <br />
            <p>
                Pour modifier votre <strong>TJM</strong>, commencez par ouvrir le menu de navigation latéral.
            </p>
            <p>
                Cliquez sur le bouton suivant, situé tout à gauche de la barre supérieure de l’application :
            </p>
            <v-btn 
                :icon="icons.mdiMenu" 
                variant="text"
                class="mb-2 ma-2"
            />
            <p>
                Ce bouton ouvre le <strong>menu de navigation latéral</strong>, également appelé "menu hamburger".
            </p>
            <p>
                Une fois ouvert, vous trouverez votre TJM affiché au <strong>centre</strong> de ce menu, sous forme d'une carte.
            </p>
            <p>
                Pour le modifier, cliquez sur ce bouton :
            </p>
            <v-btn 
                color="primary" 
                icon 
                class="mb-2 ma-2"
            >
                <v-icon :icon="icons.mdiWrench" size="large" />
            </v-btn>
            <p>
                Une fenêtre s’ouvrira pour vous permettre de saisir un nouveau TJM. 
                Une fois validé, ce montant sera pris en compte automatiquement dans vos prochaines factures.
            </p>
            <br />
        </v-card-text>


    </v-card>
</template>
<script setup lang="ts">
    import { ref, Ref } from 'vue';
    import { 
        mdiCashMultiple,
        mdiListBoxOutline,
        mdiPencilOutline,
        mdiMenu,
        mdiWrench
        
    } from '@mdi/js';

    const title: Ref<string> = ref('Comment modifier un client ?');
    const icons = ref({
        mdiCashMultiple,
        mdiListBoxOutline,
        mdiPencilOutline,
        mdiMenu,
        mdiWrench
    });
</script>
<style scoped>
.help-text {
    text-align: start;
    margin-left: 5%;
}
</style>