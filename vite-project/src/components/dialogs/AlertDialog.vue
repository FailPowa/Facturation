<template>
    <v-container>
        <v-alert
            v-model="model"
            :type="type"
            :title="props.title"
            :text="props.text"
            closable
        >
            <!-- Affichage des détails si fournis -->
            
            <template v-if="props.details?.length">
                <v-divider class="my-2" />

                <v-expansion-panels :color="props.type" variant="accordion" class="mt-2">
                    <v-expansion-panel :color="props.type">
                        <v-expansion-panel-title :color="props.type">
                            Afficher les détails ({{ props.details.length }})
                        </v-expansion-panel-title>

                        <v-expansion-panel-text>
                            <v-virtual-scroll
                                :items="props.details"
                                height="200"
                                item-height="30"
                                
                            >
                                <template #default="{ item }">
                                    <v-list-item class="text-caption py-1">{{ item }}</v-list-item>
                                </template>
                            </v-virtual-scroll>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </template>
        </v-alert>
    </v-container>
</template>


<script setup lang="ts">

    // Variable contenant le v-model du composant
    const model = defineModel({ type: Boolean})

    // Variable contenant les props du composant
    const props = defineProps({
        title: { type: String, required: true },
        type: { type: String, required: true },
        text: { type: String, required: false },
        details: { type: Array<String>, required: false }
    })

    // Variable contenant le type de la boite de dialogue
    const type = props.type as ("success" | "info" | "warning" | "error" | undefined)
</script>