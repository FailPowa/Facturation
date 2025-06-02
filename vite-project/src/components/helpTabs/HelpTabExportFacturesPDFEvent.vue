<template>
    <v-card
        flat
        :title="title"
    >
        <v-card-text class="help-text">
            <br />
            <h3>
                <v-icon 
                    :icon="icons.mdiFileDownloadOutline" 
                    color="red"
                    size="large"
                />
                Exporter une facture au format PDF
            </h3>
            <br />
            <p>
                Depuis la table des factures, que ce soit dans l'onglet <strong>Factures</strong> ou depuis la <strong>page d'Accueil</strong>, un bouton avec l'icône
                <v-icon :icon="icons.mdiFileDownloadOutline" color="red" size="small" class="mx-1"/>
                est disponible dans la section <strong>Actions</strong> de chaque ligne.
            </p>
            <p>
                En cliquant sur ce bouton, une fenêtre s'ouvre vous permettant de choisir le nom du fichier PDF à générer et l'emplacement où l'enregistrer sur votre appareil.
            </p>
            <p>
                Le contenu du PDF est automatiquement généré à partir des informations de la facture sélectionnée.
            </p>
            <br />
        </v-card-text>

    </v-card>
</template>
<script setup lang="ts">
    import { ref, Ref } from 'vue';
    import { 
        mdiUploadBoxOutline,
        mdiFileDownloadOutline,
        mdiPlus
    } from '@mdi/js';

    const title: Ref<string> = ref('Comment exporter ma facture au format pdf ?');
    const icons = ref({
        mdiUploadBoxOutline,
        mdiFileDownloadOutline,
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