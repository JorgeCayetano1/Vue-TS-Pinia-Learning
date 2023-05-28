import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { VueQueryPlugin } from "@tanstack/vue-query";

import './assets/main.css';

const myApp = createApp(App);

import '@/store/characters.store';

//  myApp.use(VueQueryPlugin);
VueQueryPlugin.install(myApp, {
    queryClientConfig: {
        defaultOptions: {
            queries: {
                cacheTime: 1000 * 120,
                refetchOnReconnect: 'always',
            }
        }
    }
})

myApp.use(router);

myApp.mount('#app');
