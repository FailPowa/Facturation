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
            <p>Depuis le calendrier des tâches, il existe plusieurs façons de modifier la durée d'une tâche, selon votre besoin</p>
            <br />
            <strong>
                1. Via la modification d'une tâche, avec l'icône suivant 
                <v-icon :icon="icons.mdiPencil" />
            </strong>
            <p>En cliquant dessus, une fenêtre s'ouvre, permettant de modifier les informations de la tâche</p>
            <p>Vous pouvez alors modifier les dates de début et de fin d'une tâche</p>
            <br />
            <strong>2. Prolonger ou réduire la durée d'une tâche sur une même journée ou semaine</strong>
            <p>Sur les vues par Semaine et Jour du calendrier, les tâches sont redimensionnables</p>
            <p>En passant votre souris sur la tâche, un bandeau plus clair apparaît en bas de celle-ci</p>
            <p>Vous pouvez étirer ou réduire la tâche en maintenant votre clic sur ce bandeau et en déplaçant votre souris, sur une même journée ou plusieurs jours</p>
            <br />
            <strong>3. Modifier la date/heure de début d'une tâche</strong>
            <p><strong>ATTENTION :</strong> Cette fonctionnalité n'est pas disponible sur les tâches durant plusieurs jours</p>
            <p>Les tâches sont déplaçables dans le calendrier, en maintenant votre clic gauche sur une tâche et en déplaçant votre souris</p>
            <p>En procédant ainsi, vous pouvez modifier plusieurs informations de la tâche</p>
            <p> - Sa date et son heure de début ( cela modifiera également sa date et son heure de fin )</p>
            <p> - La tranche associée à cette tâche en la déplaçant dans la colonne d'une autre tranche</p>
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

    const title: Ref<string> = ref('Comment modifier la durée d\'une tâche ?');
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