import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { VueQueryPlugin } from "@tanstack/vue-query";

import './assets/main.css';

const myApp = createApp(App);

myApp.use(VueQueryPlugin);

myApp.use(router);

myApp.mount('#app');
