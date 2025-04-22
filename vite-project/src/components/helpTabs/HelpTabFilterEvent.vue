<template>
    <v-card
        flat
        theme="dark"
        :title="title"
    >
        <v-card-text class="help-text">
            <br />
            <h3>
                <v-icon :icon="icons.mdiCalendar" />
                Depuis le calendrier
            </h3>
            <br />
            <p>
                Depuis le calendrier des tâches, le bandeau de filtres est disponible au dessus du calendrier
            </p>
            <br />
            <p>En cliquant dessus, celui-ci s'agrandit afin d'afficher les filtres disponibles</p>
            <p>
                Vous pouvez alors sélectionner un ou plusieurs filtres, puis cliquer sur le bouton suivant pour lancer la recherche
                <v-btn 
                    size="small"
                    color="success"
                    variant="outlined"
                >
                    Rechercher
                </v-btn>
            </p>
            <p>Une fois votre filtrage effectué, les filtres actifs sont affichés dans le bandeau, même si vous refermez celui-ci</p>
            <p>
                Supprimer un filtre avec l'icône suivant relancera automatique la recherche avec les filtres restants 
                <v-icon :icon="icons.mdiCloseCircle" />
            </p>
            <br />
            <v-divider />
            <br />
            <h3>
                <v-icon :icon="icons.mdiListBoxOutline" />
                Depuis la liste des tâches
            </h3>
            <br />
            <p>
                Depuis la liste des tâches, le bandeau de filtres est disponible au dessus du tableau
            </p>
            <br />
            <p>En cliquant dessus, celui-ci s'agrandit afin d'afficher les filtres disponibles</p>
            <p>
                Vous pouvez alors sélectionner un ou plusieurs filtres, puis cliquer sur le bouton suivant pour lancer la recherche
                <v-btn 
                    size="small"
                    color="success"
                    variant="outlined"
                >
                    Rechercher
                </v-btn>
            </p>
            <p>Une fois votre filtrage effectué, les filtres actifs sont affichés dans le bandeau, même si vous refermez celui-ci</p>
            <p>
                Supprimer un filtre avec l'icône suivant relancera automatique la recherche avec les filtres restants 
                <v-icon :icon="icons.mdiCloseCircle" />
            </p>
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
    import { ref, Ref } from 'vue';
    import { 
        mdiCalendar,
        mdiListBoxOutline,
        mdiCloseCircle
    } from '@mdi/js';

    const title: Ref<string> = ref('Comment filtrer mes tâches ?');
    const icons = ref({
        mdiCalendar,
        mdiListBoxOutline,
        mdiCloseCircle
    });
</script>
<style scoped>
.help-text {
    text-align: start;
    margin-left: 5%;
}
</style>