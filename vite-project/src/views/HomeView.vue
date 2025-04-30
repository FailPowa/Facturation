<template>
    <v-container>
        <v-row>
            <v-col
                offset="8"
                cols="2"
            >
                <TjmLayout />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn 
                    class="animate__animated animate__fadeInDown"
                    color="primary" 
                    @click="testTheme"
                >
                    Test
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup lang="ts">
    import TjmLayout from '../components/layout/TjmLayout.vue';
    import { useTheme } from 'vuetify';

    /** Assignation des thèmes vuetify */
    const theme = useTheme();

    function testTheme(): void {
        if (theme.name.value === 'darkTheme') {
            theme.global.name.value = 'blueTheme';
        } else {
            theme.global.name.value = 'darkTheme';
        }
    }
</script>