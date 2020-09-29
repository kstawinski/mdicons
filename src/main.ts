import Vue from 'vue';
import VuePrism from '@aminoeditor/vue-prism';
import App from './App.vue';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(VuePrism);

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
