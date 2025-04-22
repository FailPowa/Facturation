<template>
    <p>HELLO</p>
    <v-switch
        v-model="blabla"
        color="orange"
        label="Blablabla"
        direction="vertical"
    />
</template>
<script setup lang="ts">
    import { ref, Ref } from 'vue';

    const blabla: Ref<boolean> = ref(true);
</script>