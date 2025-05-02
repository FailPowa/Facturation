<template>
    <v-card
        flat
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
                Depuis le calendrier des tâches, le bouton suivant est disponible, en haut à droite du calendrier
                <v-btn 
                    icon 
                    size="x-small"
                    color="success"
                    class="ml-4"
                >
                    <v-icon :icon="icons.mdiPlus" />
                </v-btn>
            </p>
            <br />
            <p>En cliquant dessus, une fenêtre s'ouvre, permettant de saisir les informations de la tâche à ajouter</p>
            <p>Certaines informations sont requises pour la création d'une tâche tel que, un titre, une date de début et de fin, un statut, etc...</p>
            <br />
            <v-divider />
            <br />
            <h3>
                <v-icon :icon="icons.mdiListBoxOutline" />
                Depuis la liste des tâches
            </h3>
            <br />
            <p>
                Depuis la liste des tâches, le bouton suivant est disponible à droite du bandeau de filtres
                <v-btn 
                    icon 
                    size="x-small"
                    color="success"
                    class="ml-4"
                >
                    <v-icon :icon="icons.mdiPlus" />
                </v-btn>
            </p>
            <br />
            <p>En cliquant dessus, une fenêtre s'ouvre, permettant de saisir les informations de la tâche à ajouter</p>
            <p>Certaines informations sont requises pour la création d'une tâche tel que, un titre, une date de début et de fin, un statut, etc...</p>
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
    import { ref, Ref } from 'vue';
    import { 
        mdiCalendar,
        mdiListBoxOutline,
        mdiPlus
    } from '@mdi/js';

    const title: Ref<string> = ref('Comment ajouter une tâche ?');
    const icons = ref({
        mdiCalendar,
        mdiListBoxOutline,
        mdiPlus
    });
</script>
<style scoped>
.help-text {
    text-align: start;
    margin-left: 5%;
}
</style>