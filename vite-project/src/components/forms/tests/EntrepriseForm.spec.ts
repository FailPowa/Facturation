import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import EntrepriseForm from '../EntrepriseForm.vue';
import vuetify from '../../../../plugins/vuetify';
import { Entreprise, EntrepriseType } from '../../../../types';
import { flushPromises } from '@vue/test-utils';

describe('EntrepriseForm.vue', () => {
    it('renders the correct title', () => {
        const wrapper = mount(EntrepriseForm, { 
            props: {
                formTitle: "Ajouter une entreprise",
                entreprise: null
            },
            global: {
                components: {
                    EntrepriseForm
                },
                plugins: [vuetify]
            }
        });
        expect(wrapper.text()).contain('Ajouter une entreprise');
        wrapper.unmount();
    })

    it('Cancel Event', async () => {
        const wrapper = mount(EntrepriseForm, { 
            props: {
                formTitle: "Ajouter une entreprise",
                entreprise: null
            },
            global: {
                components: {
                    EntrepriseForm
                },
                plugins: [vuetify]
            }
        });
        wrapper.unmount();
    })

    describe("Test : Formulaire entreprise", () => {
        const mountFormWithData = (data: EntrepriseType) => {
            return mount(EntrepriseForm, {
                props: {
                    formTitle: "Ajouter une entreprise",
                    entreprise: new Entreprise(
                        data.id,
                        data.nom,
                        data.adresse,
                        data.codePostal,
                        data.ville,
                        data.mail,
                        data.numTva ? data.numTva : "",
                        data.siret,
                        data.isMe
                    )
                },
                global: {
                    plugins: [vuetify]
                }
            })
        }

        describe("EntrepriseForm - Validation globale OK", () => {
            it("Tous les champs valides => event confirm émis", async () => {
                const data = {
                    id: -1,
                    nom: "Entreprise",
                    adresse: "1 rue du Test",
                    codePostal: "75000",
                    ville: "Paris",
                    mail: "contact@entreprise.fr",
                    numTva: "FR123456789",
                    siret: "73282932000074",
                    isMe: false
                }
                const wrapper = mountFormWithData(data)

                const input = await wrapper.find('[data-testid="entreprise-form-submit-btn"]')
                input.trigger("click")
                expect(wrapper.emitted("confirm")).toBeDefined();
                const emittedData = wrapper.emitted("confirm")?.[0][0]
                expect(emittedData).toBe(data)
            })
        })


        describe("EntrepriseForm - Validation individuelle des champs", () => {
            const validData = {
                id: -1,
                nom: "Entreprise",
                adresse: "1 rue du Test",
                codePostal: "75000",
                ville: "Paris",
                mail: "contact@entreprise.fr",
                numTva: "FR123456789",
                siret: "73282932000074", // valide Luhn
                isMe: false
            }

            it("Champ nom vide => submit non émis", async () => {
                const wrapper = mountFormWithData({ ...validData, nom: "" })
                await wrapper.find('[data-testid="entreprise-form-submit-btn"]').trigger("click")
                expect(wrapper.emitted("confirm")).toBeFalsy()
            })

            it("Champ adresse vide => submit non émis", async () => {
                const wrapper = mountFormWithData({ ...validData, adresse: "" })
                await wrapper.find('[data-testid="entreprise-form-submit-btn"]').trigger("click")
                expect(wrapper.emitted("confirm")).toBeFalsy()
            })

            it("Champ codePostal vide => submit non émis", async () => {
                const wrapper = mountFormWithData({ ...validData, codePostal: "" })
                await wrapper.find('[data-testid="entreprise-form-submit-btn"]').trigger("click")
                expect(wrapper.emitted("confirm")).toBeFalsy()
            })

            it("Champ ville vide => submit non émis", async () => {
                const wrapper = mountFormWithData({ ...validData, ville: "" })
                await wrapper.find('[data-testid="entreprise-form-submit-btn"]').trigger("click")
                expect(wrapper.emitted("confirm")).toBeFalsy()
            })

            it("Mail vide => submit non émis", async () => {
                const wrapper = mountFormWithData({ ...validData, mail: "" })
                await wrapper.find('[data-testid="entreprise-form-submit-btn"]').trigger("click")
                expect(wrapper.emitted("confirm")).toBeFalsy()
            })

            it("Mail invalide => submit non émis", async () => {
                const wrapper = mountFormWithData({ ...validData, mail: "invalid.mail" })
                await wrapper.find('[data-testid="entreprise-form-submit-btn"]').trigger("click")
                expect(wrapper.emitted("confirm")).toBeFalsy()
            })

            it("SIRET vide => submit non émis", async () => {
                const wrapper = mountFormWithData({ ...validData, siret: "" })
                await wrapper.find('[data-testid="entreprise-form-submit-btn"]').trigger("click")
                expect(wrapper.emitted("confirm")).toBeFalsy()
            })

            it("SIRET avec lettres => submit non émis", async () => {
                const wrapper = mountFormWithData({ ...validData, siret: "ABCDEF12345678" })
                await wrapper.find('[data-testid="entreprise-form-submit-btn"]').trigger("click")
                expect(wrapper.emitted("confirm")).toBeFalsy()
            })

            it("SIRET avec 13 chiffres => submit non émis", async () => {
                const wrapper = mountFormWithData({ ...validData, siret: "1234567890123" })
                await wrapper.find('[data-testid="entreprise-form-submit-btn"]').trigger("click")
                expect(wrapper.emitted("confirm")).toBeFalsy()
            })

            it("SIRET 14 chiffres mais Luhn invalide => submit non émis", async () => {
                const wrapper = mountFormWithData({ ...validData, siret: "12345678901234" })
                await wrapper.find('[data-testid="entreprise-form-submit-btn"]').trigger("click")
                expect(wrapper.emitted("confirm")).toBeFalsy()
            })
        })

        describe("EntrepriseForm - Plusieurs champs invalides", () => {
            it("Nom vide + SIRET invalide + mail invalide => event confirm non émis", async () => {
                const wrapper = mountFormWithData({
                    id: -1,
                    nom: "", // invalide
                    adresse: "12 rue des Champs",
                    codePostal: "75000",
                    ville: "Paris",
                    mail: "invalidmail", // invalide
                    numTva: "FR123456789",
                    siret: "1234", // invalide (trop court, pas 14 chiffres, pas Luhn)
                    isMe: false
                })

                await wrapper.find('[data-testid="entreprise-form-submit-btn"]').trigger("click")
                expect(wrapper.emitted("confirm")).toBeFalsy()
            })
        })

    })
})