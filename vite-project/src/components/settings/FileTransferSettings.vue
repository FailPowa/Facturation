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
                    @click=""
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
    
</template>


<script setup lang="ts">

    async function exportClients() {
        await window.serviceElectron.exportClients();
    }

    async function importClients() {
        await window.serviceElectron.importClients()
    }
</script>