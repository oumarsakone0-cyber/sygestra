<template>
  <div id="app">
    <Navbar
      :activeKey="currentKey"
      :routes="routes"
      @nav="onNav"
    />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/menu/nav_barre.vue'
import HelloWorld from './components/HelloWorld.vue'  // si tu veux garder HelloWorld

export default {
  name: 'App',
  components: {
    Navbar,
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
