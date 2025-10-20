// src/router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/HelloWorld.vue';
import ImportPage from '@/components/pages/ImportPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history', // ou 'hash' si tu préfères
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/import',
      name: 'Import',
      component: ImportPage
    }
  ]
});
