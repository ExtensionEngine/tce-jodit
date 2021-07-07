import '@mdi/font/css/materialdesignicons.css';
import { Edit, Toolbar } from '../src/index';
import App from './App.vue';
import Vue from 'vue';

Vue.config.productionTip = false;
Vue.component(Edit.name, Edit);
Vue.component('tce-toolbar', Toolbar);

new Vue({
  render: h => h(App)
}).$mount('#app');
