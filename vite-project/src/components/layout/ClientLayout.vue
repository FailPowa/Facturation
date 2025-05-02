<template>
    <v-container>
        <v-row>
            <v-col>
                <p 
                    class="text-h3 animate__animated animate__fadeInDown"
                >
                    Liste des clients
                </p>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <ClientsTable />
            </v-col>
        </v-row>
       
    </v-container>
</template>

<script setup lang="ts">
    import ClientsTable from '../tables/ClientsTable.vue';
</script>