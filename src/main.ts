import Vue from 'vue';
import VuePrism from '@aminoeditor/vue-prism';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import clipboardCopy from './plugins/clipboardCopy';

Vue.config.productionTip = false;

// Clipboard copy bind
Vue.prototype.clipboardCopy = clipboardCopy;

Vue.use(VuePrism);

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
