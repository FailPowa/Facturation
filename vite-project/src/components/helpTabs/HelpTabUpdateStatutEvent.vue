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
            <p>Depuis le calendrier des tâches, il existe plusieurs façons de modifier le statut d'une tâche</p>
            <br />
            <strong>
                1. Via la modification d'une tâche, avec l'icône suivant 
                <v-icon :icon="icons.mdiPencil" />
            </strong>
            <p>En cliquant dessus, une fenêtre s'ouvre, permettant de modifier les informations de la tâche</p>
            <p>Vous pouvez alors modifier le statut d'une tâche</p>
            <br />
            <strong>2. Via le titre d'une tâche</strong>
            <p>En cliquant sur le titre d'une tâche, une liste de statuts s'ouvrira, vous permettant de modifier celui-ci rapidement</p>
            <br />
            <v-divider />
            <br />
            <h3>
                <v-icon :icon="icons.mdiListBoxOutline" />
                Depuis la liste des tâches
            </h3>
            <br />
            <p>Depuis la liste des tâches, il existe plusieurs façons de modifier le statut d'une tâche</p>
            <br />
            <strong>
                1. Via la modification d'une tâche, avec l'icône suivant 
                <v-icon :icon="icons.mdiPencil" />
            </strong>
            <p>En cliquant dessus, une fenêtre s'ouvre, permettant de modifier les informations de la tâche</p>
            <p>Vous pouvez alors modifier le statut d'une tâche</p>
            <br />
            <strong>
                2. Via le tableau avec le statut affiché comme suit
                <v-chip>
                    <v-icon :icon="icons.mdiProgressWrench" />
                    En cours
                </v-chip>
            </strong>
            <p>En cliquant sur le statut d'une tâche, une liste des statuts s'ouvrira, vous permettant de modifier celui-ci rapidement</p>
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
    import { ref, Ref } from 'vue';
    import { 
        mdiCalendar,
        mdiListBoxOutline,
        mdiPencil,
        mdiProgressWrench
    } from '@mdi/js';

    const title: Ref<string> = ref('Comment modifier le statut d\'une tâche ?');
    const icons = ref({
        mdiCalendar,
        mdiListBoxOutline,
        mdiPencil,
        mdiProgressWrench
    });
</script>
<style scoped>
.help-text {
    text-align: start;
    margin-left: 5%;
}
</style>