<template>
    <v-card
        flat
        :title="title"
    >
        <v-card-text class="help-text">
            <br />
            <h3>
                <v-icon :icon="icons.mdiThemeLightDark" size="large" />
                Changer le thème de l'application
            </h3>
            <br />

            <p>
                Pour modifier le thème (clair/sombre), ouvrez le menu latéral :
                <v-btn color="transparent" icon>
                    <v-icon :icon="mdiMenu" size="large" />
                </v-btn>
                situé tout à gauche de la barre supérieure.
            </p>
            <p>
                Une fois le menu ouvert, cliquez sur :
                <v-btn color="secondary" icon>
                    <v-icon :icon="mdiCog" size="large" />
                </v-btn>
                en bas à gauche du panneau.
            </p>

            <br />
            <p>
                En haut de cette section, vous trouverez les boutons liés à différents :
            </p>

            <v-btn 
                    width="100" 
                    :color="darkTheme.colors?.background || 'primary'"
                    class="ma-3"
            >
                Sombre
            </v-btn>
            <v-btn 
                    width="100" 
                    :color="lightTheme.colors?.background || 'primary'"
                    class="ma-3"
            >
                Clair
            </v-btn>
            <v-btn 
                    width="100" 
                    :color="retroTheme.colors?.background || 'primary'"
                    class="ma-3"
            >
                Retro
            </v-btn>

            <p>
                Un simple clic sur ce bouton permet de basculer entre le thème clair et le thème sombre de l'application.
            </p>
            <p>
                Le changement est immédiat et est conservé lors de vos prochaines connexions.
            </p>
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
    import { ref, Ref } from 'vue';
    import { 
        mdiCashMultiple,
        mdiListBoxOutline,
        mdiPencilOutline,
        mdiMenu,
        mdiCog
        
    } from '@mdi/js';
    import { 
        darkTheme, 
        retroTheme, 
        lightTheme
    } from '../../themes';

    const title: Ref<string> = ref('Comment modifier un client ?');
    const icons = ref({
        mdiCashMultiple,
        mdiListBoxOutline,
        mdiPencilOutline,
        mdiMenu,
        mdiCog,
    });
</script>
<style scoped>
.help-text {
    text-align: start;
    margin-left: 5%;
}
</style>