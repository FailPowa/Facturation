import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import TjmDialog from '../TjmDialog.vue';
import vuetify from '../../../../plugins/vuetify';


describe('TjmDialog.vue', () => {
    it('Test : Annuler la saisie du montant TJM', () => {
        const wrapper = mount(TjmDialog, { 
            props: {
                tjmMontant: 200,
            },
            global: {
                components: {
                    TjmDialog
                },
                plugins: [vuetify]
            }
        });
        wrapper.vm.exitDialog();
        const eventsEmitted: Record<string, number[][]> = wrapper.emitted();
        expect(eventsEmitted, "L'évènement 'exit' n'a pas été émi").toHaveProperty("exit");
        wrapper.unmount();
    })

    it('Test : Confirmer la saisie du montant du TJM', () => {
        const wrapper = mount(TjmDialog, { 
            props: {
                tjmMontant: 200,
            },
            global: {
                components: {
                    TjmDialog
                },
                plugins: [vuetify]
            }
        });
        wrapper.vm.confirmDialog();
        const eventsEmitted: Record<string, number[][]> = wrapper.emitted();
        expect(eventsEmitted, "L'évènement 'exit' n'a pas été émi").toHaveProperty("confirm");
        wrapper.unmount();
    })

    it('Test : Récupérer le nouveau montant du TJM', () => {
        const wrapper = mount(TjmDialog, { 
            props: {
                tjmMontant: 200,
            },
            global: {
                components: {
                    TjmDialog
                },
                plugins: [vuetify]
            }
        });
        wrapper.vm.confirmDialog();
        const eventsEmitted: Record<string, Date[]> = wrapper.emitted();
        expect(eventsEmitted, "L'évènement 'exit' n'a pas été émi").toHaveProperty("exit");
        wrapper.unmount();
    })
})
