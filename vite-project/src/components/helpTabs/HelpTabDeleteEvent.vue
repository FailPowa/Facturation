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
            <p>Depuis le calendrier des tâches, il existe plusieurs façons de supprimer une tâche</p>
            <br />
            <strong>
                1. Avec l'icône suivant, disponible en bas de chaque tâche 
                <v-icon :icon="icons.mdiTrashCanOutline" />
            </strong>
            <p>En cliquant dessus, la tâche associée sera supprimée</p>
            <br />
            <strong>2. En maintenant le clic gauche sur une tâche</strong>
            <p>Un bandeau Supprimer apparaîtra en haut de la tâche, vous permettant de la supprimer en cliquant dessus</p>
            <br />
            <v-divider />
            <br />
            <h3>
                <v-icon :icon="icons.mdiListBoxOutline" />
                Depuis la liste des tâches
            </h3>
            <br />
            <p>
                Depuis la liste des tâches, l'icône suivant est disponible dans le tableau, à droite de chaque tâche
                <v-icon :icon="icons.mdiTrashCanOutline" />
            </p>
            <br />
            <p>En cliquant dessus, la tâche associée sera supprimée</p>
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
    import { ref, Ref } from 'vue';
    import { 
        mdiCalendar,
        mdiListBoxOutline,
        mdiTrashCanOutline
    } from '@mdi/js';

    const title: Ref<string> = ref('Comment supprimer une tâche ?');
    const icons = ref({
        mdiCalendar,
        mdiListBoxOutline,
        mdiTrashCanOutline
    });
</script>
<style scoped>
.help-text {
    text-align: start;
    margin-left: 5%;
}
</style>