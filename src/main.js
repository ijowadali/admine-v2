import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { setupRouter } from '@/router';
import globalComponents from './global-components';
import utils from './utils';
import './assets/css/app.css';

const app = createApp(App).use(createPinia());

globalComponents(app);
utils(app);

setupRouter(app);

app.mount('#app');
