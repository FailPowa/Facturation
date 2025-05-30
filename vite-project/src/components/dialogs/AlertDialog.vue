<template>
    <v-alert
        v-model="model"
        :type="props.intent"
        class=""
        elevation="10"
        closable
        width="600"
        @click:close="emits('close')"
        @vue:mounted="displayTemporarily"
    >
        <slot></slot>
    </v-alert>
</template>


<script setup lang="ts">
    import { onBeforeUnmount } from 'vue';
    import { useUiStore } from '../../stores/ui';

    
    // Variable contenant le v-model du composant
    const model = defineModel({ type: Boolean})

    // Variable contenant les props du composant
    const props = defineProps({
        intent: {
            type: String,
            default: 'info',
            validator(value: string): boolean {
                return ['info', 'success', 'warning', 'error'].includes(value);
            }
        },
        duration: { // En seconde
            type: Number,
            required: false
        }
    })

    // Evenement
    const emits = defineEmits(['close'])

    // Identifiant de la fonction timeout lancé au montage de l'alerte
    let timeoutId: ReturnType<typeof setTimeout>;

    // Terminer la fonction displayTemporarily avant le démontage
    onBeforeUnmount(() => {
        clearTimeout(timeoutId);
    })

    // Permet de fermer l'alerte automatiquement après une certaine durée
    async function displayTemporarily(){
        if (props.duration){
            timeoutId = setTimeout(() => {
                model.value = false;
            }, props.duration * 1000)
        }
    }
</script>

