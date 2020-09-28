import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import clipboardCopy from './plugins/clipboardCopy';

Vue.config.productionTip = false;

// Clipboard copy bind
Vue.prototype.clipboardCopy = clipboardCopy;

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
