<template>
  <nav class="navbar">
    <!-- Bloc 1 : Bouton menu + menu flottant -->
    <div class="bloc bloc-gauche">
      <button class="menu-btn" @click="toggleMenu">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <rect x="3" y="3" width="4" height="4"></rect>
          <rect x="10" y="3" width="4" height="4"></rect>
          <rect x="17" y="3" width="4" height="4"></rect>
          <rect x="3" y="10" width="4" height="4"></rect>
          <rect x="10" y="10" width="4" height="4"></rect>
          <rect x="17" y="10" width="4" height="4"></rect>
          <rect x="3" y="17" width="4" height="4"></rect>
          <rect x="10" y="17" width="4" height="4"></rect>
          <rect x="17" y="17" width="4" height="4"></rect>
        </svg>
      </button>
      <span class="brand">{{ brandText }}</span>

      <!-- Menu flottant -->
      <transition name="fade">
        <div v-if="menuVisible" class="dropdown-menu">
          <div class="arrow"></div>
          <ul>
            <li v-for="item in dropdownItems" :key="item">{{ item }}</li>
          </ul>
        </div>
      </transition>
    </div>

    <!-- Bloc 2 : Menu central -->
    <ul class="bloc bloc-centre">
      <li
        v-for="item in menuItems"
        :key="item.key"
        :class="{ active: item.key === activeKey }"
        @click="navigate(item)"
      >
        <span class="icon" v-html="item.icon"></span>
        <span class="label">{{ item.label }}</span>
      </li>
    </ul>

    <!-- Bloc 3 : Nom utilisateur + bouton déconnexion -->
    <div class="bloc bloc-droit">
      <span class="username">{{ userName }}</span>
      <button class="logout-btn" @click="$emit('logout')">Déconnexion</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBarre',
  props: {
    userName: { type: String, default: 'OUEDRAOGO Abou' },
    brandText: { type: String, default: 'ENTREPRISE' },
    activeKey: { type: String, default: 'dashboard' }
  },
  data() {
    return {
      menuVisible: false,
      dropdownItems: ['Entreprise', 'Option 2', 'Option 3'],
      menuItems: [
        {
          key: 'dashboard',
          label: 'Dashboard',
          icon: `<svg viewBox='0 0 24 24' width='18' height='18' fill='none' stroke='currentColor' stroke-width='2'><path d='M3 3h7v7H3z'/><path d='M14 3h7v4h-7z'/><path d='M14 10h7v11h-7z'/><path d='M3 11h7v9H3z'/></svg>`
        },
        {
          key: 'import',
          label: 'Import',
          icon: `<span class="material-icons" style="font-size:18px">send</span>`
        },
        {
          key: 'export',
          label: 'Export',
          icon: `<span class="material-icons" style="font-size:18px">sync_alt</span>`
        },
        {
          key: 'chauffeurs',
          label: 'Chauffeurs',
          icon: `<svg viewBox='0 0 24 24' width='18' height='18' fill='none' stroke='currentColor' stroke-width='2'><path d='M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0'/><path d='M6 21v-2a6 6 0 0 1 12 0v2'/></svg>`
        },
        {
          key: 'camions',
          label: 'Camions',
          icon: `<svg viewBox='0 0 24 24' width='18' height='18' fill='none' stroke='currentColor' stroke-width='2'><path d='M3 7h10v8H3z'/><path d='M13 10h5l3 3v2h-8'/><circle cx='7.5' cy='18' r='1.5'/><circle cx='17.5' cy='18' r='1.5'/></svg>`
        }
      ]
    }
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    navigate(item) {
      this.$emit('nav', item.key)
    }
  }
}
</script>

<style scoped>
/* Material Icons */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

/* Animation dropdown */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter, .fade-leave-to { opacity: 0; }

/* Navbar */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #0a7a00;
  height: 60px;
  color: #fff;
  font-family: Arial, sans-serif;
}

/* Bloc gauche */
.bloc-gauche {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #6f8f54;
}
.menu-btn {
  background-color: #b81f2d;
  border: none;
  color: #fff;
  width: 60px;
  height: 60px;
  cursor: pointer;
}
.brand {
  padding: 0 20px;
  font-weight: bold;
  font-size: 15px;
}

/* Dropdown menu */
.dropdown-menu {
  position: absolute;
  top: 60px;
  left: 0;
  background-color: #6f8f54;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  z-index: 10;
  min-width: 150px;
}
.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 5px 0;
}
.dropdown-menu li {
  padding: 10px 15px;
  cursor: pointer;
  white-space: nowrap;
}
.dropdown-menu li:hover { background-color: rgba(255,255,255,0.2); }
/* flèche */
.dropdown-menu .arrow {
  position: absolute;
  top: -8px;
  left: 20px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #6f8f54;
}

/* Bloc central */
.bloc-centre {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  list-style: none;
  margin: 0;
  padding-left: 20px;
}
.bloc-centre li {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 18px;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;
}
.bloc-centre li:hover { background: rgba(255, 255, 255, 0.15); }
.bloc-centre li.active { background: rgba(255, 255, 255, 0.25); }

/* Bloc droit */
.bloc-droit {
  display: flex;
  align-items: center;
  background-color: #6f8f54;
  padding: 0 10px 0 20px;
  border-radius: 6px;
}
.username { font-weight: bold; margin-right: 10px; }
.logout-btn {
  background-color: #b81f2d;
  border: none;
  color: #fff;
  padding: 10px 16px;
  margin-left: 10px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
}
.logout-btn:hover { background-color: #a21824; }
</style>
