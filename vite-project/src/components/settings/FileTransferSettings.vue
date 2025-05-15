<template>
    <v-container>
        <v-row justify="center">
            <v-col>
                <p
                    class="text-h4"
                >
                    Imports / Exports
                </p>
            </v-col>
        </v-row>
        <v-row>
            <!-- Exporter les clients -->
            <v-col>
                <v-btn
                    color="primary"
                    block
                    @click="exportClients"
                >
                    Exporter les clients
                </v-btn>
            </v-col>

            <!-- Exporter les factures -->
            <v-col>
                <v-btn
                    color="secondary"
                    block
                    @click="exportFactures"
                >
                    Exporter les factures
                </v-btn>
            </v-col>            
        </v-row>
        <v-row>
            <!-- Importer les clients -->
            <v-col>
                <v-btn
                    color="primary"
                    block
                    @click="importClients"
                >
                    Importer les clients
                </v-btn>
            </v-col>

            <!-- Importer les factures -->
            <v-col>
                <v-btn
                    color="secondary"
                    block
                    @click=""
                >
                    Importer les factures
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
    <!-- Boite de dialoge : Alerte suppression client -->
    <v-dialog
        v-model="alertDialog"
    >
        <AlertDialog
            v-model="alertDialog"
            :title="response ? response.message : 'Aucun message'"
            :details="response?.details"
            :type="typeRef"
        />
    </v-dialog>    
</template>


<script setup lang="ts">
    import { Ref, ref } from 'vue';
    import { CallbackMessage } from '../../../types';
    import AlertDialog from '../dialogs/AlertDialog.vue';

    // Variable des boites de dialogues
    const alertDialog = ref(false);
    
    // Le type de la boite de dialogue ne peut prendre que les valeurs suivantes ("success" | "info" | "warning" | "error" | undefined)
    const typeRef: Ref<string> = ref("");

    // Variable contenant la reponse des imports/exports
    const response: Ref<CallbackMessage | null> = ref(null);
    
    
    async function exportClients() {
        response.value = await window.serviceElectron.exportClients();
        switch(response.value?.code){
            case 0:
                typeRef.value = 'success';
                alertDialog.value = true;
                break
            case 1:
                typeRef.value = 'warning';
                alertDialog.value = true;
                break
            case 2:
                break
        }
    }

    async function exportFactures() {
        response.value = await window.serviceElectron.exportFactures()
        switch(response.value?.code){
            case 0:
                typeRef.value = 'success';
                alertDialog.value = true;
                break
            case 1:
                typeRef.value = 'warning';
                alertDialog.value = true;
                break
            case 2:
                break
        }
    }

    async function importClients() {
        response.value = await window.serviceElectron.importClients()
        switch(response.value?.code){
            case 0:
                typeRef.value = 'success';
                alertDialog.value = true;
                break
            case 1:
                typeRef.value = 'warning';
                alertDialog.value = true;
                break
            case 2:
                break
        }
    }

</script>