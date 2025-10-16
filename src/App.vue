<template>
  <div id="app">

    <Navbar
      :activeKey="currentKey"
      :routes="routes"
      @nav="onNav"
    />
    <router-view />

    
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <ImportPage />

  </div>
  
</template>

<script>

import Navbar from './components/menu/nav_barre.vue'


import HelloWorld from './components/HelloWorld.vue'
import ImportPage from './components/pages/ImportPage.vue'



export default {
  name: 'App',
  components: {

    Navbar,
    ImportPage,
    HelloWorld   // si tu veux garder HelloWorld
  },
  data() {
    return {
      currentKey: 'import',
      routes: {
        dashboard: '/',
        import: '/import',
        export: '/export',
        drivers: '/drivers',
        trucks: '/trucks'
      }
    }
  },
  watch: {
    $route(to) {
      const map = {
        '/': 'dashboard',
        '/import': 'import',
        '/export': 'export',
        '/drivers': 'drivers',
        '/trucks': 'trucks'
      }
      this.currentKey = map[to.path] || ''
    }
  },
  methods: {
    onNav(key) {
      this.currentKey = key
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
