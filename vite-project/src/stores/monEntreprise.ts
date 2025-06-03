import { defineStore } from 'pinia';
import { EntrepriseType } from '../../types';

const useMonEntreprise = defineStore('monEntreprise', {
    state: (): { infos: EntrepriseType } => ({ infos : {
        id: -1,
        nom: "",
        adresse: "",
        codePostal: "",
        ville: "",
        mail: "",
        numTva: "",
        siret: "",
        isMe: false
    }}),
    getters: {
        monEntreprise: (state): EntrepriseType => state.infos
    },
    actions: {
        async update() {
            const result = await window.serviceElectron.getMonEntreprise();
            this.infos = result as EntrepriseType
        }
    }
});

export { useMonEntreprise }