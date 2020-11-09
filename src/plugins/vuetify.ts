import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        background: '#FFFFFF',
      },
      dark: {
        secondary: '#FFFFFF',
        background: '#0a0a0a',
      },
    },
    dark: false,
  },
});
