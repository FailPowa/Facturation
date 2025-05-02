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
            <p>Depuis le calendrier des tâches, il existe plusieurs façons de modifier la tranche concernée d'une tâche</p>
            <br />
            <strong>
                1. Via la modification d'une tâche, avec l'icône suivant 
                <v-icon :icon="icons.mdiPencil" />
            </strong>
            <p>En cliquant dessus, une fenêtre s'ouvre, permettant de modifier les informations de la tâche</p>
            <p>Vous pouvez alors modifier la tranche concernée d'une tâche</p>
            <br />
            <strong>2. En déplaçant la tâche</strong>
            <p><strong>ATTENTION :</strong> Cette fonctionnalité n'est pas disponible sur les tâches durant plusieurs jours</p>
            <p>Les tâches sont déplaçables dans le calendrier, en maintenant votre clic gauche sur une tâche et en déplaçant votre souris</p>
            <p>En procédant ainsi, vous pouvez modifier plusieurs informations de la tâche</p>
            <p> - La tranche associée à cette tâche en la déplaçant dans la colonne d'une autre tranche</p>
            <p> - Sa date et son heure de début ( cela modifiera également sa date et son heure de fin )</p>
            <br />
            <v-divider />
            <br />
            <h3>
                <v-icon :icon="icons.mdiListBoxOutline" />
                Depuis la liste des tâches
            </h3>
            <br />
            <p>Depuis la liste des tâches, il existe plusieurs façons de modifier la tranche concernée d'une tâche</p>
            <br />
            <strong>
                1. Via la modification d'une tâche, avec l'icône suivant 
                <v-icon :icon="icons.mdiPencil" />
            </strong>
            <p>En cliquant dessus, une fenêtre s'ouvre, permettant de modifier les informations de la tâche</p>
            <p>Vous pouvez alors modifier la tranche concernée d'une tâche</p>
            <br />
            <strong>
                2. Via le tableau avec la tranche affichée comme suit
                <v-chip color="yellow">B3</v-chip>
            </strong>
            <p>En cliquant sur la tranche concernée d'une tâche, une liste des tranches s'ouvrira, vous permettant de modifier celle-ci rapidement</p>
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

    const title: Ref<string> = ref('Comment modifier la tranche concernée d\'une tâche ?');
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