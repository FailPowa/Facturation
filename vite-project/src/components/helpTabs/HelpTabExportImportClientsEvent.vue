<template>
    <v-card
        flat
        :title="title"
    >
        <v-card-text class="help-text">
            <br />
            <h3>
                <v-icon 
                    :icon="icons.mdiUploadBoxOutline" 
                    size="large" 
                />
                Je souhaite envoyer mes tâches à un collègue
            </h3>
            <br />
            <p>Le bouton ci-dessous vous permet d'exporter les tâches de votre application</p>
            <v-btn 
                :loading="loadingExport"
                size="small"
                color="success"
                class="mt-2 mb-2"
                @click="exportEvents"
            >
                Exporter mes tâches
            </v-btn>
            <p>En cliquant dessus, cela génère un fichier <strong>super_planner_taches.json</strong> que vos collègues pourront importer via la section suivante</p>
            <br />
            <v-divider />
            <br />
            <h3>
                <v-icon 
                    :icon="icons.mdiDownloadBoxOutline" 
                    size="large" 
                />
                Je souhaite récupérer les tâches d'un collègue
            </h3>
            <br />
            <p>Le champ ci-dessous vous permet de sélectionner un fichier json, précédemment généré via la section ci-dessus</p>
            <p>Puis de l'importer en cliquant sur le bouton à droite du champs</p>
            <v-row class="mt-3">
                <v-file-input
                    v-model="selectedFile"
                    :loading="loadingImport"
                    label="Veuillez sélectionner un fichier"
                    accept="application/JSON"
                    variant="outlined"
                    density="compact"
                    max-width="40%"
                />
                <v-btn 
                    :loading="loadingImport"
                    color="primary"
                    class="ml-4"
                    @click="importEvents"
                >
                    Importer le fichier
                </v-btn>
            </v-row>
            <p>
                <strong>ATTENTION :</strong>
                Cela supprimera tout travail déjà réalisé sur votre application
            </p>
            <p>Cette fonctionnalité réalise une copie du travail de votre collègue, sans sauvegarde préalable de votre propre travail</p>
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
    import { ref, Ref } from 'vue';
    import { 
        mdiUploadBoxOutline,
        mdiDownloadBoxOutline,
        mdiPlus
    } from '@mdi/js';

    const title: Ref<string> = ref('Comment échanger mon travail avec mes collègues ?');
    const icons = ref({
        mdiUploadBoxOutline,
        mdiDownloadBoxOutline,
        mdiPlus
    });
    const loadingExport: Ref<boolean> = ref(false);
    const loadingImport: Ref<boolean> = ref(false);
    const selectedFile: Ref<File | null> = ref(null);

    /**
     * Exporte les tâches sauvegardées
     */
    async function exportEvents(): Promise<void> {
        loadingExport.value = true;
        loadingExport.value = false;
    }

    /**
     * Importe le fichier JSON
     */
    async function importEvents(): Promise<void> {
        loadingImport.value = true;
        if (selectedFile.value !== null) {
            
        }
        loadingImport.value = false;
    }
</script>
<style scoped>
.help-text {
    text-align: start;
    margin-left: 5%;
}
</style>