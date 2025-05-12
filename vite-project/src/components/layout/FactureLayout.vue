<template>
    <v-container>
        <v-row>
            <v-col>
                <p 
                    class="text-h3 animate__animated animate__fadeInDown"
                >
                    Liste des factures
                </p>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <!-- <FacturesTable /> -->
                <FacturesTable />
            </v-col>
        </v-row>
       
    </v-container>
</template>

<script setup lang="ts">
    import FacturesTable from '../tables/FacturesTable.vue';
</script>