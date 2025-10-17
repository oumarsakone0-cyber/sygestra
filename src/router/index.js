// src/router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/HelloWorld.vue';

Vue.use(Router);

export default new Router({
  mode: 'history', // ou 'hash' si tu préfères
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
});
