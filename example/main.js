import '@mdi/font/css/materialdesignicons.css';
import { Edit, Toolbar } from '../src/index';
import App from './App.vue';
import { createApp } from 'vue';

const app = createApp(App);

app.component(Edit.name, Edit);
app.component('tce-toolbar', Toolbar);

app.mount('#app');
