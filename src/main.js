// import './assets/main.css';

import { createApp } from 'vue';

import { createPinia } from 'pinia';

import App from './App.vue';

import router from './router';

// vue-loading-overlay

import Loading from 'vue-loading-overlay';

import 'vue-loading-overlay/dist/css/index.css';

//

const app = createApp(App);

app.component('Loading', Loading);

app.use(createPinia());

app.use(router);

app.mount('#app');
