<template>
    <v-card height="80vh" class="d-flex flex-column">
        <!-- Barre d'outils -->
        <v-toolbar dense flat class="px-2">

            <!-- Remplissage à gauche -->
            <v-spacer />
            
            <!-- Zoom - au centre -->
            <v-btn variant="text" :icon="mdiMagnifyMinus" @click="zoomOut" />
            <span class="mx-2 align-self-center">{{ (scale * 100).toFixed(0) }}%</span>
            <v-btn variant="text" :icon="mdiMagnifyPlus" @click="zoomIn" />
            
            <!-- Remplissage à droite -->
            <v-spacer />

            <!-- Bouton de fermeture -->
            <v-btn icon @click="exitDialog">
                <v-icon>{{ mdiClose }}</v-icon>
            </v-btn>
        </v-toolbar>
         <!-- Zone scrollable contenant le PDF -->
        <div 
            class="overflow-y-auto pa-4 flex-grow-1 d-flex justify-center"
        >
            <div             
                
            >
                <VuePDF 
                    v-for="page in pages" 
                    :key="page"
                    :pdf="pdf" 
                    :scale="scale"
                    :page="page"
                    text-layer 
                    annotation-layer
                />
            </div>
        </div>
    </v-card>

</template>

<script setup lang="ts">
    import { VuePDF, usePDF } from '@tato30/vue-pdf'; 
    import { ref } from 'vue';
    import { mdiMagnifyPlus, mdiMagnifyMinus, mdiClose } from '@mdi/js';
    import '@tato30/vue-pdf/style.css';

    /** Paramètres du composant */
    const props = defineProps({
        urlPdf : { type: String, required: true }
    });

    /** Définition des événements */
    const emit = defineEmits([
        'cancel'
    ]);


    /** Variable pour gérer le zoom du pdf */
    const scale = ref(1)

    /** Variables pour le composant VuePDF */
    const { pdf, pages } = usePDF({
        url: props.urlPdf,
        enableXfa: true,
    });


    /** Augmente le zoom sur le pdf */
    function zoomIn() {
        scale.value += 0.1
    }

    /** Réduit le zoom sur le pdf */
    function zoomOut() {
        if (scale.value > 0.2) {
            scale.value -= 0.1
        }
    }

    /**
     * Clic sur le bouton Annuler
     */
    function exitDialog(): void {
        emit('cancel');
    };
</script>