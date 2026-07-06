import { createApp } from 'vue';
import { createWebHashHistory } from 'vue-router';
import App from './App.vue';
import { createAppRouter } from './router/index.js';

createApp(App).use(createAppRouter(createWebHashHistory())).mount('#app');
