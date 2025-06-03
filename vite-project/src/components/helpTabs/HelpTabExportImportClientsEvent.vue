<template>
    <v-card
        flat
        :title="title"
    >
        <v-card-text class="help-text">
            <br />
            <h3>
                <v-icon :icon="icons.mdiImport" size="large" />
                Gérer les clients : Import / Export
            </h3>
            <br />

            <p>
                Pour accéder à cette fonctionnalité, cliquez sur le menu :
                <v-btn color="transparent" icon>
                    <v-icon :icon="icons.mdiMenu" size="large" />
                </v-btn>
                tout à gauche de la barre de navigation.
            </p>
            <p>
                Puis en bas à gauche du menu, cliquez sur :
                <v-btn color="secondary" icon>
                    <v-icon :icon="icons.mdiCog" size="large" />
                </v-btn>
            </p>

            <br />

            <!-- Export clients -->
            <p>Exporter les clients existants :</p>
            <v-btn color="primary" class="mt-2 mb-2" size="small">
                Exporter les clients
            </v-btn>
            <p>
                Cela génère un fichier <strong>nom_fichier.json</strong> à sauvegarder. Vous pourrez ensuite le partager ou l'importer ailleurs.
            </p>

            <br />
            <v-divider class="my-4" />
            <br />

            <!-- Import clients -->
            <p>Importer des clients exportés :</p>
            <v-btn color="primary" class="mt-2 mb-2" size="small">
                Importer les clients
            </v-btn>
            <p>
                Vous pourrez sélectionner un fichier exporté depuis cette application.
            </p>
            <p>
                Les nouveaux clients seront ajoutés à la liste actuelle. Si certains sont déjà présents, l'import échouera.
            </p>
            <p>
                <strong>Important :</strong> seuls les fichiers générés par cette application sont acceptés.
            </p>
        </v-card-text>


    </v-card>
</template>
<script setup lang="ts">
    import { ref, Ref } from 'vue';
    import { 
        mdiImport,
        mdiCog,
        mdiMenu
    } from '@mdi/js';

    const title: Ref<string> = ref('Comment échanger mon travail avec mes collègues ?');
    const icons = ref({
        mdiImport,
        mdiCog,
        mdiMenu
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
            return
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