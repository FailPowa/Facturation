import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import monEntrepriseDetails from '../monEntrepriseDetails.vue';
import { Entreprise } from '../../../../types';
import vuetify from '../../../../plugins/vuetify';
import { numTvaFormatter, siretFormatter } from '../../../../plugins/entrepriseFormatter';

describe('monEntrepriseDetails.vue', () => {
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
            .contain(entreprise.nom, "the compopent doesn't contain name")
            .contain(entreprise.adresse, "the compopent doesn't contain adresse")
            .contain(entreprise.codePostal, "the component doesn't contain code postal")
            .contain(entreprise.ville, "the component doesn't contain ville")
            .contain(entreprise.mail, "the component doesn't contain mail")
            .contain(numTvaFormatter(entreprise.numTva || ""), "the component doesn't contain numTva")
            .contain(siretFormatter(entreprise.siret), "the component doesn't contain siret")
    })
})