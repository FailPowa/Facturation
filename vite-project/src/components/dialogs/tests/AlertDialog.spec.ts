import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AlertDialog from '../AlertDialog.vue';
import vuetify from '../../../../plugins/vuetify';

describe('AlertDialog.vue', () => {
    it('renders the correct message', () => {
        const message = "Test réussi avec succès!"
        const wrapper = mount(AlertDialog, { 
            props: {
                intent: "success",
                modelValue: true
            },
            slots: {
                default: message
            },
            global: {
                components: {
                    AlertDialog
                },
                plugins: [vuetify]
            }
        });
        expect(wrapper.text()).toContain(message);
        wrapper.unmount();
    })

    /**
     *     
    it('Close automaticall  y  the dialog after 5 seconds', async () => {
        const wrapper = mount(AlertDialog, { 
            props: {
                intent: "success",
                modelValue: true,
                duration: 5
            },
            global: {
                components: {
                    AlertDialog
                },
                plugins: [vuetify]
            }
        });
        await new Promise(resolve => setTimeout(resolve, 5100))
                
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    })
    */
})