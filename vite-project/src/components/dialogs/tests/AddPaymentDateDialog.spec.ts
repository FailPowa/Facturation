import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AddPaymentDateDialog from '../AddPaymentDateDialog.vue';
import vuetify from '../../../../plugins/vuetify';


describe("AddPaymentDateDialog.vue", () => {
    it("Test : Annuler la saisie de la date de paiement", () => {
        const dateFacture = new Date("09/30/2024");
        const wrapper = mount(AddPaymentDateDialog, {
            props : {
                dateFacture: dateFacture
            },
            global: {
                components: {
                    AddPaymentDateDialog
                },
                plugins: [vuetify]
            }
        });
        wrapper.vm.exitDialog();
        const eventsEmitted: Record<string, Date[]> = wrapper.emitted();
        expect(eventsEmitted, "L'évènement 'annuler' n'a pas été émi").toHaveProperty('cancel');
        wrapper.unmount();
    })
    
    it("Test : Confirmer la saise de la date de paiement", () => {
        const dateFacture = new Date("09/30/2024");
        const wrapper = mount(AddPaymentDateDialog, {
            props : {
                dateFacture: dateFacture
            },
            global: {
                components: {
                    AddPaymentDateDialog
                },
                plugins: [vuetify]
            }
        });
        wrapper.vm.confirmDialog();
        const eventsEmitted: Record<string, Date[][]> = wrapper.emitted();
        expect(eventsEmitted, "L'évènement 'confirmer' n'a pas été émi").toHaveProperty("confirm");
        wrapper.unmount();
    })

    describe("Test : Date de paiement récupéré", () => {
    
        it("Nominal : Date de paiement valide", () => {
            const dateFacture = new Date(2024, 9 - 1, 30);
            const datePaiement = new Date(2024, 10 - 1, 10);
            const wrapper = mount(AddPaymentDateDialog, {
                props : {
                    dateFacture: dateFacture
                },
                global: {
                    components: {
                        AddPaymentDateDialog
                    },
                    plugins: [vuetify]
                }
            });
            wrapper.vm.datePaiement = datePaiement
            wrapper.vm.confirmDialog();
            const eventsEmitted: Record<string, Date[][]> = wrapper.emitted();
            expect(eventsEmitted, "L'évènement 'confirmer' n'a pas été émi").toHaveProperty("confirm");
            expect(eventsEmitted["confirm"][0][0], "L'évènement ne retourne pas la date de paiement voulu").toBe(datePaiement);
            wrapper.unmount();
        })

        it("Nominal : Date de paiement équivalent à la date de facture", () => {
            const dateFacture = new Date(2024, 9 - 1, 30);
            const wrapper = mount(AddPaymentDateDialog, {
                props : {
                    dateFacture: dateFacture
                },
                global: {
                    components: {
                        AddPaymentDateDialog
                    },
                    plugins: [vuetify]
                }
            });
            wrapper.vm.confirmDialog();
            const eventsEmitted: Record<string, Date[][]> = wrapper.emitted();
            expect(eventsEmitted, "L'évènement 'confirmer' n'a pas été émi").toHaveProperty("confirm");
            expect(eventsEmitted["confirm"][0][0], "L'évènement ne retourne pas la date de paiement voulu").toBe(dateFacture);
            wrapper.unmount();
        })

        it("Echec : Date de paiement inférieur à la date de la facture", () => {
            const dateFacture = new Date(2024, 9 - 1, 30);
            const datePaiement = new Date(2024, 8 - 1, 10);
            const wrapper = mount(AddPaymentDateDialog, {
                props : {
                    dateFacture: dateFacture
                },
                global: {
                    components: {
                        AddPaymentDateDialog
                    },
                    plugins: [vuetify]
                }
            });
            wrapper.vm.datePaiement = datePaiement;
            wrapper.vm.confirmDialog();
            const eventsEmitted: Record<string, Date[][]> = wrapper.emitted();
            expect(eventsEmitted["confirm"], "L'évènement 'confirmer' a été émi").toBeUndefined()
            wrapper.unmount();
        })
    })
})