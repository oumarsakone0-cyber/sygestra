// src/router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/HelloWorld.vue';
import PageDeGardePdf from '@/components/fichier.PDF/page_de_garde.vue';
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
    },
    {
      path: '/pdf',
      name: 'PdfCover',
      component: PageDeGardePdf,
      props: {
        logoUrl: '/logo.png',
        societe: 'SOCIETE GENERAL DE COMMERCE ET DE TRANSPORT',
        reference: '12/24 - PM 14',
        titreL1: 'PROPRE',
        titreL2: 'MOYEN',
        client: 'ACTIVA TRADE',
        dateReception: '2024-12-26',
        transitaire: 'MIENSAH',
        modeLivraison: 'REMORQUE',
        zoneLivraison: 'COCODY',
        numBL: 'COSU5403205400',
        declaration: 'C72872',
        nbrTCS: 4,
        badtDate: '2024-12-26',
        contact: ''
      }
    }
  ]
});
