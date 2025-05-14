<template>
    <v-container>
        <v-alert
            v-model="model"
            type="warning"
            title="Attention! Suppression client impossible"
            text="Ce client ne peut pas être supprimé car il est lié à plusieurs factures."
            closable
        >
        </v-alert>
    </v-container>
</template>


<script setup lang="ts">
    import { mdiAlertCircle } from '@mdi/js';

    const model = defineModel({ type: Boolean})
</script>