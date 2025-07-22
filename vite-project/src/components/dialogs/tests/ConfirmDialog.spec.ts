import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import vuetify from '../../../../plugins/vuetify';
import ConfirmDialog from '../ConfirmDialog.vue';

describe('ConfirmDialog.vue', () => {
    it('Montre le bon titre', () => {
        const wrapper = mount(ConfirmDialog, { 
            props: {
                questionTitle: "Voulez-vous supprimer cet objet ?",
            },
            global: {
                components: {
                    ConfirmDialog
                },
                plugins: [vuetify]
            }
        });
        expect(wrapper.text()).contain("Voulez-vous supprimer cet objet ?");
        wrapper.unmount();
    })

    it('Evenement Annulation de la boite de dialgue', () => {
        const wrapper = mount(ConfirmDialog, { 
            props: {
                questionTitle: "Voulez-vous supprimer cet objet ?"
            },
            global: {
                components: {
                    ConfirmDialog
                },
                plugins: [vuetify]
            }
        });
        const btnCancel = wrapper.get('[id="cancel-btn"]');
        btnCancel.trigger('click');
        const cancelEvent = wrapper.emitted('cancel');
        expect(cancelEvent, "Doesn't emit 'cancel event'").toHaveLength(1);
    })

    it('Evenement Confirmation de la boite de dialogue', () => {
        const wrapper = mount(ConfirmDialog, { 
            props: {
                questionTitle: "Voulez-vous supprimer cet objet ?"
            },
            global: {
                components: {
                    ConfirmDialog
                },
                plugins: [vuetify]
            }
        });
        const btnConfirm = wrapper.get('[id="confirm-btn"]');
        btnConfirm.trigger('click');
        const confirmEvent = wrapper.emitted('confirm');
        expect(confirmEvent, "Doesn't emit 'confirm event'").toHave Length(1);
    })
})