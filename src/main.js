import { createApp } from 'vue';
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { createPinia } from 'pinia';
import App from './App.vue';
import { setupRouter } from './router';
import { setupStore } from './stores';
import globalComponents from './global-components';
import utils from './utils';
import './assets/css/app.css';

const app = createApp(App).use(createPinia());

globalComponents(app);
utils(app);

app.use(Vue3Toasity, {
  autoClose: 3000,
});

setupStore(app);
setupRouter(app);

app.mount('#app');
