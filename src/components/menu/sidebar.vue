<template>
  <div class="sidebar-container">
    <!-- User Profile Section -->
    <div class="user-profile">
      <div class="user-info">
        <span class="user-avatar-single material-icons">person</span>
        <div class="user-name">SAKONE Oumar</div>
        <div class="user-title">Responsable Informatique</div>
      </div>
    </div>

  <div class="sidebar-content">
      <!-- Main Vertical Navigation -->
      <div class="main-nav">
        <div class="nav-item" :class="{ active: activeCategory === 'bennes' }" @click="setActiveCategory('bennes')">
          <span class="material-icons nav-icon red">arrow_forward</span>
          <span class="nav-text red">Bennes</span>
        </div>
        <div class="nav-item" :class="{ active: activeCategory === 'conteneurs' }" @click="setActiveCategory('conteneurs')">
          <span class="material-icons nav-icon green">local_shipping</span>
          <span class="nav-text green">Conteneurs</span>
        </div>
        <div class="nav-item" :class="{ active: activeCategory === 'rh' }" @click="setActiveCategory('rh')">
          <span class="material-icons nav-icon blue">people</span>
          <span class="nav-text blue">R_Humaine</span>
        </div>
        <div class="nav-item" :class="{ active: activeCategory === 'fichiers' }" @click="setActiveCategory('fichiers')">
          <span class="material-icons nav-icon purple">folder</span>
          <span class="nav-text purple">Fichiers</span>
        </div>
      </div>

      <!-- Sub-menu Content Area -->
      <div class="submenu-content">
        <div class="section-header">
          <span class="line"></span>
          <span class="section-label">{{ activeLabel }}</span>
          <span class="line"></span>
        </div>
        <div class="submenu-items">
          <div class="submenu-item" :class="{ active: selectedKey==='dashboard' }" @click="selectedKey='dashboard'">
            <span class="material-icons submenu-icon" :class="{ red: selectedKey==='dashboard' }">grid_view</span>
            <span class="submenu-text" :class="{ red: selectedKey==='dashboard' }">Dashboard Conteneur</span>
            <div class="active-indicator" v-if="selectedKey==='dashboard'"></div>
          </div>
          <div class="submenu-item" :class="{ active: selectedKey==='agl' }" @click="selectedKey='agl'">
            <span class="material-icons submenu-icon" :class="{ red: selectedKey==='agl' }">grid_view</span>
            <span class="submenu-text" :class="{ red: selectedKey==='agl' }">A.G.L</span>
            <div class="active-indicator" v-if="selectedKey==='agl'"></div>
          </div>
          <div class="submenu-item" :class="{ active: selectedKey==='import' }" @click="selectedKey='import'">
            <span class="material-icons submenu-icon" :class="{ red: selectedKey==='import' }">person_add</span>
            <span class="submenu-text" :class="{ red: selectedKey==='import' }">Import</span>
            <div class="active-indicator" v-if="selectedKey==='import'"></div>
          </div>
          <div class="submenu-item" :class="{ active: selectedKey==='export' }" @click="selectedKey='export'">
            <span class="material-icons submenu-icon" :class="{ red: selectedKey==='export' }">flag</span>
            <span class="submenu-text" :class="{ red: selectedKey==='export' }">Export</span>
            <div class="active-indicator" v-if="selectedKey==='export'"></div>
          </div>
          <div class="submenu-item" :class="{ active: selectedKey==='bilan' }" @click="selectedKey='bilan'">
            <span class="material-icons submenu-icon" :class="{ red: selectedKey==='bilan' }">assignment</span>
            <span class="submenu-text" :class="{ red: selectedKey==='bilan' }">Bilan Import</span>
            <div class="active-indicator" v-if="selectedKey==='bilan'"></div>
          </div>
          <div class="submenu-item" :class="{ active: selectedKey==='facturation' }" @click="selectedKey='facturation'">
            <span class="material-icons submenu-icon" :class="{ red: selectedKey==='facturation' }">request_quote</span>
            <span class="submenu-text" :class="{ red: selectedKey==='facturation' }">Facturation</span>
            <div class="active-indicator" v-if="selectedKey==='facturation'"></div>
          </div>
          <div class="submenu-item" :class="{ active: selectedKey==='chauffeurs' }" @click="selectedKey='chauffeurs'">
            <span class="material-icons submenu-icon" :class="{ red: selectedKey==='chauffeurs' }">person</span>
            <span class="submenu-text" :class="{ red: selectedKey==='chauffeurs' }">Chauffeurs</span>
            <div class="active-indicator" v-if="selectedKey==='chauffeurs'"></div>
          </div>
          <div class="submenu-item" :class="{ active: selectedKey==='camions' }" @click="selectedKey='camions'">
            <span class="material-icons submenu-icon" :class="{ red: selectedKey==='camions' }">local_shipping</span>
            <span class="submenu-text" :class="{ red: selectedKey==='camions' }">Camions</span>
            <div class="active-indicator" v-if="selectedKey==='camions'"></div>
          </div>
        </div>

        <!-- Full-width visual progress strip (non-interactive) -->
        <div class="scroll-progress" aria-hidden="true"></div>

        <!-- Bottom Utility Section (scrolls with content) -->
        <div class="bottom-utils">
          <div class="logout-item">
            <span class="material-icons logout-icon">arrow_back</span>
            <span class="logout-text">Déconnexion</span>
          </div>
          <button class="settings-btn">
            <span class="material-icons settings-icon">settings</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  emits: ['close'],
  data() {
    return {
      activeCategory: 'conteneurs',
      selectedKey: 'dashboard'
    }
  },
  computed: {
    activeLabel() {
      const map = {
        bennes: 'Bennes',
        conteneurs: 'Conteneur',
        rh: 'R_Humaine',
        fichiers: 'Fichiers'
      }
      return map[this.activeCategory] || ''
    }
  },
  methods: {
    setActiveCategory(category) {
      this.activeCategory = category
      // Reset selection context on category change
      this.selectedKey = category === 'conteneurs' ? 'dashboard' : ''
    }
  }
}
</script>

<style scoped>
.sidebar-container {
  width: 100%;
  height: 100vh;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 90px;
}

/* User Profile Section */
.user-profile {
  background: white;
  padding: 20px;
  text-align: center;
  /* remove bottom separator line */
  border-bottom: none;
  padding-left: 44px;
  width: 100%;
  box-sizing: border-box;
}

/* profile icon styled as big avatar */
.user-avatar-single {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #e9ecef;
  color: #2b2f36;
  font-size: 34px;
}
.user-name { font-size: 18px; font-weight: 700; color: #2b2f36; margin: 10px 0 4px; }
.user-title { font-size: 14px; color: #6b7280; }

/* Sidebar Content */
.sidebar-content {
  flex: 1;
  display: flex;
  overflow: visible;
  background: white;
}

/* Main Vertical Navigation */
.main-nav {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 44px;
  background: white;
  border-right: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  padding: 8px 0;
}

/* Sub-menu Content Area */
.submenu-content {
  flex: 1;
  background: white;
  padding: 20px;
  overflow: visible;
  width: 100%;
  box-sizing: border-box;
  padding-left: 44px;
}

/* Dynamic section header between separators */
.section-header { display: flex; align-items: center; gap: 12px; margin: 6px 0 14px; }
.section-header .line { height: 1px; background: #e5e7eb; flex: 1; }
.section-header .section-label { font-weight: 700; color: #2c3e50; font-size: 14px; white-space: nowrap; }

.category-title { display:none; }

.submenu-items { display: flex; flex-direction: column; gap: 8px; }
.submenu-item { display: flex; align-items: center; padding: 12px 16px; cursor: pointer; border-radius: 8px; transition: background 0.2s; position: relative; }
.submenu-item:hover { background: #f8f9fa; }
.submenu-item.active { background: #fff3cd; }
.submenu-icon { font-size: 18px; margin-right: 12px; color: #6c757d; }
.submenu-text { font-size: 14px; color: #212529; flex: 1; }
.submenu-text.red { color: #dc3545; }
.active-indicator { position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 4px; height: 20px; background: #dc3545; border-radius: 2px; }

/* Rail items */
.nav-item { display: flex; flex-direction: column; align-items: center; padding: 12px 6px; cursor: pointer; transition: background 0.2s; }
.nav-item:hover { background: #f8f9fa; }
.nav-item.active { background: #e8f5e8; }
.nav-icon { font-size: 20px; margin-bottom: 4px; }
/* match rail icon colors with labels */
.nav-icon.red { color: #dc3545; }
.nav-icon.green { color: #28a745; }
.nav-icon.blue { color: #0d6efd; }
.nav-icon.purple { color: #6f42c1; }
.nav-text { font-size: 10px; font-weight: 500; writing-mode: vertical-rl; text-orientation: mixed; }
.nav-text.red { color: #dc3545; }
.nav-text.green { color: #28a745; }
.nav-text.blue { color: #007bff; }
.nav-text.purple { color: #6f42c1; }

/* Visual full-width progress strip above bottom */
.scroll-progress { height: 6px; background: #e5e7eb; border-radius: 9999px; width: 100%; margin: 10px 0 8px; }

/* Bottom Utility Section */
.bottom-utils {
  background: white;
  padding: 15px 8px;
  border-top: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  margin-top: 0;
}

.logout-item { display: flex; align-items: center; gap: 6px; cursor: pointer; padding: 8px 8px; border-radius: 6px; transition: background 0.2s; }
.logout-item:hover { background: #f8f9fa; }
.logout-icon { font-size: 18px; color: #dc3545; }
.logout-text { font-size: 14px; color: #dc3545; font-weight: 500; }
.settings-btn { background: #ffffff; border: 2px solid #007bff; width: 36px; height: 36px; border-radius: 8px; color: #007bff; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.settings-btn:hover { background: #f1f6ff; }
.settings-btn .material-icons, .settings-icon { font-size: 18px; color: #007bff; }

/* Color helpers for submenu icons */
.icon-blue { color: #1d4ed8; }
.icon-green { color: #16a34a; }
.icon-purple { color: #6d28d9; }
.icon-orange { color: #f59e0b; }
.icon-teal { color: #0d9488; }
.icon-indigo { color: #4338ca; }
.icon-slate { color: #334155; }
/* header user info inline avatars */
.user-info { display: flex; flex-direction: column; align-items: center; }
.user-inline-avatars { display: flex; flex-direction: column; align-items: center; gap: 2px; margin-bottom: 8px; }
.user-inline-avatars .top { font-size: 22px; color: #2b2f36; }
.user-inline-avatars .bottom { font-size: 22px; color: #9aa3ad; }
.user-name { font-size: 18px; font-weight: 700; color: #2b2f36; margin: 10px 0 4px; }
.user-title { font-size: 14px; color: #6b7280; }

/* section header one-sided line */
.section-header { display: flex; align-items: center; gap: 12px; margin: 6px 0 14px; }
.section-header .section-label { font-weight: 700; color: #2c3e50; font-size: 14px; white-space: nowrap; }
.section-header .line { height: 1px; background: #e5e7eb; flex: 1; }

/* active (clicked) turns red; default icons/text black */
.submenu-icon { color: #2b2f36; }
.submenu-text { color: #2b2f36; }
.submenu-text.red, .submenu-icon.red { color: #dc3545; }
</style>

