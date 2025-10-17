<template>
  <div id="app">

    <Navbar
      :activeKey="currentKey"
      :routes="routes"
      @nav="onNav"
      @toggle-sidebar="toggleSidebar"
    />


    <div class="main-container">
      <!-- Sidebar -->
      <transition name="slide">
        <div v-if="isSidebarOpen" class="sidebar">
          <Sidebar @close="toggleSidebar" />
        </div>
      </transition>

      <!-- Contenu principal -->
      <div class="content">
        <router-view />
        <HelloWorld msg="Welcome to Your Vue.js App"/>
        <ImportPage />
      </div>
    </div>
  </div>
</template>


<script>
import Navbar from './components/menu/nav_barre.vue'
import HelloWorld from './components/HelloWorld.vue'
import ImportPage from './components/pages/ImportPage.vue'
import Sidebar from './components/menu/sidebar.vue' // 

export default {
  name: 'App',
  components: {
    Navbar,
    ImportPage,
    HelloWorld,
    Sidebar
  },
  data() {
    return {
      currentKey: 'import',
      isSidebarOpen: false, // 👈 nouveau
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
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
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

.main-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #f0f0f0;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
}

.content {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

/* Animation */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}

/* Bouton */
.toggle-btn {
  position: fixed;
  top: 60px;
  left: 10px;
  z-index: 1000;
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

</style>
