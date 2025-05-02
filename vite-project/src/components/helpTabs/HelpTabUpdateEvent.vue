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
                Depuis le calendrier des tâches, l'icône suivant est disponible en bas de chaque tâche déjà enregistrée
                <v-icon :icon="icons.mdiPencil" />
            </p>
            <br />
            <p>En cliquant dessus, une fenêtre s'ouvre, permettant de modifier les informations de la tâche</p>
            <p>Toutes les informations sont modifiables, cependant, comme pour la création,</p>
            <p>certaines sont requises à l'enregistrement tel que, le titre, les dates de début et de fin, le statut, etc...</p>
            <br />
            <v-divider />
            <br />
            <h3>
                <v-icon :icon="icons.mdiListBoxOutline" />
                Depuis la liste des tâches
            </h3>
            <br />
            <p>
                Depuis la liste des tâches, l'icône suivant est disponible dans le tableau, à droite de chaque tâche enregistrée
                <v-icon :icon="icons.mdiPencil" />
            </p>
            <br />
            <p>En cliquant dessus, une fenêtre s'ouvre, permettant de modifier les informations de la tâche</p>
            <p>Toutes les informations sont modifiables, cependant, comme pour la création,</p>
            <p>certaines sont requises à l'enregistrement tel que, le titre, les dates de début et de fin, le statut, etc...</p>
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
    import { ref, Ref } from 'vue';
    import { 
        mdiCalendar,
        mdiListBoxOutline,
        mdiPencil
    } from '@mdi/js';

    const title: Ref<string> = ref('Comment modifier une tâche ?');
    const icons = ref({
        mdiCalendar,
        mdiListBoxOutline,
        mdiPencil
    });
</script>
<style scoped>
.help-text {
    text-align: start;
    margin-left: 5%;
}
</style>