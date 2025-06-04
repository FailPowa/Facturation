import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import monEntrepriseDetails from '../monEntrepriseDetails.vue';
import { Entreprise } from '../../../../types';
import vuetify from '../../../../plugins/vuetify';

describe('EntrepriseForm.vue', () => {
    it("renders the correct company's details", () => {
        const entreprise = new Entreprise(
            1,
            "Gotei 13",
            "Seireitei",
            "00000",
            "Soul Society",
            "gotei13@soul.society.so",
            "FR77889900112",
            "38012986648625",
            false
        )
        const wrapper = mount(monEntrepriseDetails, { 
            props: {
                entreprise: entreprise
            },
            global: {
                components: {
                    monEntrepriseDetails
                },
                plugins: [vuetify]
            }
        });
        expect(wrapper.text())
            .contain(entreprise.nom, "Doesn't contain name")
            .contain(entreprise.adresse)
            .contain(entreprise.codePostal)
            .contain(entreprise.mail)
    })
})