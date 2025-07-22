<template>
    <v-card
        flat
        :title="title"
    >
        <v-card-text class="help-text">
            <br />
            <h3>
                <v-icon :icon="icons.mdiInvoiceImportOutline" size="large" />
                Gérer les factures : Import / Export
            </h3>
            <br />

            <p>
                Pour accéder à cette section, ouvrez le menu :
                <v-btn color="transparent" icon>
                    <v-icon :icon="icons.mdiMenu" size="large" />
                </v-btn>
                puis cliquez sur :
                <v-btn color="secondary" icon>
                    <v-icon :icon="icons.mdiCog" size="large" />
                </v-btn>
                tout en bas à gauche.
            </p>

            <br />

            <!-- Export factures -->
            <p>Exporter vos factures :</p>
            <v-btn color="secondary" class="mt-2 mb-2" size="small">
                Exporter les factures
            </v-btn>
            <p>
                Cela vous permet de télécharger un fichier <strong>nom_fichier.json</strong> contenant toutes vos factures actuelles.
            </p>

            <br />
            <v-divider class="my-4" />
            <br />

            <!-- Import factures -->
            <p>Importer des factures :</p>
            <v-btn color="secondary" class="mt-2 mb-2" size="small">
                Importer les factures
            </v-btn>
            <p>
                Choisissez un fichier <strong>nom_fichier.json</strong> généré par cette application.
            </p>
            <p>
                Les nouvelles factures seront ajoutées à celles existantes. Si certaines sont déjà présentes, l'import échouera.
            </p>
            <p>
                <strong>Important :</strong> seuls les fichiers créés via cette application peuvent être importés.
            </p>
        </v-card-text>


    </v-card>
</template>
<script setup lang="ts">
    import { ref, Ref } from 'vue';
    import { 
        mdiPlus,
        mdiMenu,
        mdiCog,
        mdiInvoiceImportOutline
    } from '@mdi/js';

    const title: Ref<string> = ref('Comment échanger mon travail avec mes collègues ?');
    const icons = ref({
        mdiPlus,
        mdiMenu,
        mdiCog,
        mdiInvoiceImportOutline
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