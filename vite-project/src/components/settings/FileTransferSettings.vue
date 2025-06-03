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
</template>


<script setup lang="ts">
    import { CallbackMessage, ResultCode } from '../../../types';
    import { useUiStore } from '../../stores/ui';
    
    /** Stores  */
    const uiStore = useUiStore();

    /**
     * Affiche une boîte de dialogue en fonction du code de retour reçu.
     * @param code Code de retour 
     * @param message Message de retour
     * @param details Informations supplémentaires sur le message de retour
     */
    function showAlertDialog(code: number, message: string) {
        switch(code){
            case ResultCode.Success:
                uiStore.showMessage(message, 'success')
                break
            case ResultCode.Warning:
                uiStore.showMessage(message, 'warning')
                break
            case ResultCode.Cancel:
                // Code 2 : Annulation de la transaction
                break
            default: 
                uiStore.showMessage("Erreur inconnu : " + `${code}`, 'error')
                
        }
    }
    
    /**
     * Exporte les données des clients
     */
    async function exportClients() {
        uiStore.setLoading(true);
        const response: CallbackMessage = await window.serviceElectron.exportClients();
        uiStore.setLoading(false);
        showAlertDialog(response.code, response.message);
    }

    /**
     * Exporte les données des factures
     */
    async function exportFactures() {
        uiStore.setLoading(true);
        const response: CallbackMessage = await window.serviceElectron.exportFactures();
        uiStore.setLoading(false);
        showAlertDialog(response.code, response.message);
    }

    /**
     * Importe les données des clients
     */
    async function importClients() {
        uiStore.setLoading(true);
        const response: CallbackMessage = await window.serviceElectron.importClients();
        uiStore.setLoading(false);
        showAlertDialog(response.code, response.message, response.details);
    }

    /**
     * Importe les données des factures
     */
    async function importFactures() {
        uiStore.setLoading(true);
        const response: CallbackMessage = await window.serviceElectron.importFactures();
        uiStore.setLoading(false);
        showAlertDialog(response.code, response.message, response.details);
    }


</script>