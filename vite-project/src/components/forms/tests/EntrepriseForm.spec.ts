import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import EntrepriseForm from '../EntrepriseForm.vue';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
  components,
  directives,
})

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
    })
})