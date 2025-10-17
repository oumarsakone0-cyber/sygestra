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
      <!-- Mobile overlay sidebar -->
      <div v-if="isSidebarOpen" class="sidebar-overlay no-dim" @click.self="toggleSidebar">
        <div class="sidebar floating" @click.stop>
          <Sidebar @close="toggleSidebar" />
        </div>
      </div>

      <!-- Desktop static sidebar -->
      <div v-if="isSidebarOpen" class="sidebar static">
        <Sidebar @close="toggleSidebar" />
      </div>

      <!-- Contenu principal -->
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>


<script>
import Navbar from './components/menu/nav_barre.vue'
import Sidebar from './components/menu/sidebar.vue' // 

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar
  },
  data() {
    return {
      currentKey: 'dashboard',
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

.sidebar-overlay {
  position: fixed;
  top: 48px; /* keep navbar visible */
  bottom: 64px; /* keep bottom bar visible on mobile */
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.12);
  z-index: 1000;
  display: flex;
  justify-content: flex-start; /* slide from left */
}
.sidebar-overlay.no-dim { background: transparent; }
.sidebar.floating {
  width: 260px;
  background-color: #f0f0f0;
  padding: 20px;
  box-shadow: 4px 0 18px rgba(0,0,0,0.22);
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

/* Desktop static sidebar visible only on desktop when open */
.sidebar.static {
  width: 260px;
  background-color: #f0f0f0;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
}

.content {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

/* Show floating overlay only on mobile, static on desktop */
@media (max-width: 680px) {
  .sidebar.static { display: none; }
}
@media (min-width: 681px) {
  .sidebar-overlay { display: none !important; }
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
