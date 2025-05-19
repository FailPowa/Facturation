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
                    @click="importFactures"
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
            :title="messageRef"
            :details="detailsRef"
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
    const messageRef: Ref<string> = ref("");
    const detailsRef: Ref<string[]> = ref([]);

    // Enumération contenant les different code de retour
    enum ResultCode {
        Success = 0,
        Warning = 1,
        Cancel = 2
    }

    /**
     * Affiche une boîte de dialogue en fonction du code de retour reçu.
     * @param code Code de retour 
     * @param message Message de retour
     * @param details Informations supplémentaires sur le message de retour
     */
    function showAlertDialog(code: number, message: string, details: string[]) {
        messageRef.value = message
        detailsRef.value = details
        switch(code){
            case ResultCode.Success:
                typeRef.value = 'success';  // Code 0 : succès
                alertDialog.value = true;   // Affiche la boite de dialogue
                break
            case ResultCode.Warning:
                typeRef.value = 'warning';  // Code 1 : echec
                alertDialog.value = true;   // Affiche la boite de dialogue
                break
            case ResultCode.Cancel:
                // Code 2 : Annulation de la transaction
                break
            default: 
                typeRef.value = 'error'; // 
                alertDialog.value = true;
                detailsRef.value = [`Code de retour inconnu : ${code}`, `Message de retour: ${message}`, ...details] 
                messageRef.value = "Erreur inconnu"
                
        }
    }
    
    /**
     * Exporte les données des clients
     */
    async function exportClients() {
        const response: CallbackMessage = await window.serviceElectron.exportClients();
        showAlertDialog(response.code, response.message, response.details);
    }

    /**
     * Exporte les données des factures
     */
    async function exportFactures() {
        const response: CallbackMessage = await window.serviceElectron.exportFactures();
        showAlertDialog(response.code, response.message, response.details);
    }

    /**
     * Importe les données des clients
     */
    async function importClients() {
        const response: CallbackMessage = await window.serviceElectron.importClients();
        showAlertDialog(response.code, response.message, response.details);
    }

    /**
     * Importe les données des factures
     */
    async function importFactures() {
        const response: CallbackMessage = await window.serviceElectron.importFactures();
        showAlertDialog(response.code, response.message, response.details);
    }


</script>