<template>
    <v-container>
        <v-row>
            <v-col>
                <p class="text-h5">Thèmes</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn 
                    width="100" 
                    :color="darkTheme.colors?.background || 'primary'"
                    @click="theme.global.name.value = 'darkTheme'"
                >
                    Sombre
                </v-btn>
            </v-col>
            <v-col>
                <v-btn 
                    width="100" 
                    :color="lightTheme.colors?.background ||'primary'"
                    @click="theme.global.name.value = 'lightTheme'"    
                >
                    Clair
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn 
                    width="100"
                    :color="greenTheme.colors?.background || 'primary'"
                    @click="theme.global.name.value = 'greenTheme'"
                >
                    Green
                </v-btn>
            </v-col>
            <v-col>
                <v-btn 
                    width="100" 
                    :color="retroTheme.colors?.background"
                    @click="theme.global.name.value = 'retroTheme'"
                >
                    Retro
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>


<script setup lang="ts">
    import { greenTheme, darkTheme, retroTheme, lightTheme, blueTheme } from '../../themes';
    import { useTheme } from 'vuetify';

    const theme = useTheme();

</script>