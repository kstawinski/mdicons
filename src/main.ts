import Vue from 'vue';
import VuePrism from '@aminoeditor/vue-prism';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import eventBus from './plugins/eventBus';

Vue.config.productionTip = false;

Vue.use(VuePrism);
Vue.use(eventBus);

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
