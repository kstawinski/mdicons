import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#5e21f3',
        secondary: '#263238',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
      dark: {
        primary: '#411b9e',
        secondary: '#FFFFFF',
      },
    },
    dark: false,
  },
});
