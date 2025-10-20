<!-- Navbar.vue -->
<template>
  <div class="nav-shell">
  <nav class="navbar">
    <div class="bloc bloc-gauche">
      <!-- Desktop left menu button (red rounded square with grid) -->
      <button class="menu-btn desktop-only desktop-grid" @click="$emit('toggle-sidebar')" aria-label="Ouvrir le menu">
        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" fill="currentColor">
          <!-- Smaller centered 3x3 grid -->
          <rect x="6" y="6" width="3" height="3" rx="0.6"></rect>
          <rect x="10.5" y="6" width="3" height="3" rx="0.6"></rect>
          <rect x="15" y="6" width="3" height="3" rx="0.6"></rect>
          <rect x="6" y="10.5" width="3" height="3" rx="0.6"></rect>
          <rect x="10.5" y="10.5" width="3" height="3" rx="0.6"></rect>
          <rect x="15" y="10.5" width="3" height="3" rx="0.6"></rect>
          <rect x="6" y="15" width="3" height="3" rx="0.6"></rect>
          <rect x="10.5" y="15" width="3" height="3" rx="0.6"></rect>
          <rect x="15" y="15" width="3" height="3" rx="0.6"></rect>
        </svg>
      </button>
      <span class="brand">{{ brandText }}</span>
      <span class="firstname">{{ userFirstName }}</span>
    </div>

    <!-- Menu central -->
    <ul class="bloc bloc-centre">
      <li
        v-for="item in menuItems"
        :key="item.key"
        :data-key="item.key"
        :class="{ active: item.key === activeKey }"
        @click="navigate(item)"
      >
        <span class="icon" v-html="item.icon"></span>
        <span class="label">{{ item.label }}</span>
      </li>
    </ul>

    <!-- Menu droit -->
    <div class="bloc bloc-droit">
      <!-- Bouton menu pour mobile (dropdown/side menu) -->
      <button class="menu-btn mobile-only" @click="$emit('toggle-sidebar')">
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

      <span class="username">
        <span class="material-icons user-icon">person</span>
        {{ userName }}
      </span>
      <button class="logout-btn" @click="$emit('logout')">
        <span class="material-icons logout-icon">logout</span>
        Déconnexion
      </button>
    </div>
    <!-- Mobile header (exact style like the photo) -->
    <div class="mobile-bar">
      <button class="circle-btn" @click="$emit('toggle-sidebar')" aria-label="Ouvrir le menu">
        <span class="material-icons">menu</span>
      </button>
      <div class="mobile-text">
        <div class="brand-big">{{ brandText }}</div>
        <div class="fullname">{{ userName }}</div>
      </div>
      <div class="avatar-wrapper">
        <button class="avatar" @click="toggleUserMenu" aria-label="Ouvrir le profil">
          <span class="material-icons">person</span>
        </button>
        <div v-if="showUserMenu" class="user-dropdown">
          <div class="user-line">Profil utilisateur</div>
          <div class="user-line muted">Informations à venir…</div>
          <button class="logout-line" @click="$emit('logout')">
            <span class="material-icons">logout</span>
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Bottom bar mobile -->
  <nav class="bottom-bar">
    <ul class="bottom-group left">
      <li @click="navigateKey('import')">
        <span class="material-icons">send</span>
        <span class="bottom-label">Import</span>
      </li>
      <li @click="navigateKey('export')">
        <span class="material-icons">sync_alt</span>
        <span class="bottom-label">Export</span>
      </li>
    </ul>
    <button class="fab" @click="navigateKey('dashboard')">
      <svg viewBox='0 0 24 24' width='22' height='22' fill='none' stroke='currentColor' stroke-width='2'>
        <path d='M3 3h7v7H3z'/><path d='M14 3h7v4h-7z'/><path d='M14 10h7v11h-7z'/><path d='M3 11h7v9H3z'/>
      </svg>
    </button>
    <ul class="bottom-group right">
      <li @click="navigateKey('chauffeurs')">
        <svg viewBox='0 0 24 24' width='22' height='22' fill='none' stroke='currentColor' stroke-width='2'>
          <path d='M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0'/><path d='M6 21v-2a6 6 0 0 1 12 0v2'/>
        </svg>
        <span class="bottom-label">Chauff.</span>
      </li>
      <li @click="navigateKey('camions')">
        <svg viewBox='0 0 24 24' width='22' height='22' fill='none' stroke='currentColor' stroke-width='2'>
          <path d='M3 7h10v8H3z'/><path d='M13 10h5l3 3v2h-8'/><circle cx='7.5' cy='18' r='1.5'/><circle cx='17.5' cy='18' r='1.5'/>
        </svg>
        <span class="bottom-label">Cam.</span>
      </li>
    </ul>
  </nav>
    </div>
</template>

<script>
export default {
  name: 'NavBarre',
  props: {
    userName: { type: String, default: 'OUEDRAOGO Abou' },
    brandText: { type: String, default: 'ENTREPRISE' },
    activeKey: { type: String, default: 'dashboard' }
  },
  emits: ['nav', 'toggle-sidebar'], // 👈 Déclaration de l'événement
  data() {
    return {
      // ❌ menuVisible supprimé
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
      ],
      showUserMenu: false
    }
  },
  computed: {
    userFirstName() {
      if (!this.userName) return ''
      const parts = this.userName.trim().split(/\s+/)
      return parts[parts.length - 1]
    }
  },
  methods: {
    navigate(item) {
      this.$emit('nav', item.key)
    },
    navigateKey(key) {
      this.$emit('nav', key)
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
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
  background-image: url('https://res.public.onecdn.static.microsoft/owamail/20251010001.14/resources/images/themes/beach/headerbgmaing2.gif');
  background-size: cover;
  background-position: center;
  height: 48px;
  line-height: 48px;
  color: #fff;
  font-family: Arial, sans-serif;
  width: 100%;
  flex-wrap: nowrap;
  overflow: hidden;
  position: sticky;
  top: 0;
  z-index: 1100;
}
.nav-shell { position: relative; }

/* Bloc gauche */
.bloc-gauche {
  position: relative;
  display: flex;
  align-items: center;
}
.menu-btn {
  background-color: #b81f2d;
  border: none;
  color: #fff;
  width: 60px;
  height: 48px;
  cursor: pointer;
}
.menu-btn.desktop-grid {
  width: 76px; /* enlarged */
  height: 48px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: #b81f2d;
  padding: 0;
}
.menu-btn.desktop-grid svg {
  width: 100%;
  height: 100%;
}

.brand {
  padding: 0 20px;
  font-weight: bold;
  font-size: 14px;
}
.company-logo { font-size: 18px; margin-left: 8px; }
.firstname { font-size: 13px; font-weight: 600; margin-left: 8px; }

/* Dropdown menu */
.dropdown-menu {
  position: absolute;
  top: 48px;
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
  min-width: 0;
  overflow: hidden;
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
  font-size: 14px;
}
.bloc-centre li:hover { background: rgba(255, 255, 255, 0.15); }
.bloc-centre li.active { background: rgba(255, 255, 255, 0.25); }

/* Bloc droit */
.bloc-droit {
  display: flex;
  align-items: center;
  padding: 0 10px 0 20px;
}
.username {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: bold;
  margin-right: 10px;
  font-size: 13px;
}
.user-icon { font-size: 18px; }
.logout-btn {
  background-color: #b81f2d;
  border: none;
  color: #fff;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  margin-left: 10px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 13px;
  cursor: pointer;
}
.logout-btn:hover { background-color: #a21824; }
.logout-icon { font-size: 18px; }

/* Responsive */
@media (max-width: 992px) {
  .brand { padding: 0 12px; font-size: 14px; }
  .bloc-centre li { margin: 0 10px; padding: 6px 8px; }
  .logout-btn { padding: 8px 12px; font-size: 13px; }
}

/* Progressive hide: shrink items one by one */
@media (max-width: 900px) {
  .bloc-centre li[data-key="import"] { display: none; }
}
@media (max-width: 820px) {
  .bloc-centre li[data-key="export"] { display: none; }
}
@media (max-width: 780px) {
  .bloc-centre li[data-key="chauffeurs"] { display: none; }
}
@media (max-width: 740px) {
  .bloc-centre li[data-key="camions"] { display: none; }
}
@media (max-width: 680px) {
  .bloc-centre li[data-key="dashboard"] { display: none; }
  .brand { padding: 0 8px; font-size: 13px; }
  .username { max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .menu-btn { width: 60px; height: 48px; } /* larger on mobile */
  .logout-btn { padding: 8px 10px; }
  /* Spécificités mobile navbar */
  .username, .logout-btn { display: none; }
}

/* Bottom bar */
.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: none; /* visible en mobile */
  justify-content: center;
  align-items: center;
  height: 64px;
  z-index: 1050;
  background: transparent;
  padding: 0 15px 10px;
}
.bottom-bar .bottom-group {
  display: flex;
  gap: 30px;
  background: #ffffff;
  padding: 12px 20px;
  border-radius: 25px;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
  align-items: center;
  flex: 1;
  max-width: calc(100vw - 16px);
}
.bottom-bar .bottom-group li {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 11px;
  color: #2c3e50;
  cursor: pointer;
}
.bottom-bar .bottom-label { margin-top: 2px; }
.bottom-bar .fab {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  margin: 0 20px;
  border-radius: 50%;
  background: #0a7a00;
  color: #fff;
  border: none;
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  position: relative;
  z-index: 10;
  flex-shrink: 0;
}
@media (max-width: 680px) {
  .bottom-bar { display: flex; }
}

/* Mobile header inspired by the screenshot */
.mobile-bar {
  display: none;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 12px;
  background: transparent;
}
.mobile-bar .circle-btn {
  width: 48px; /* enlarged */
  height: 48px;
  border-radius: 50%;
  border: none;
  background: #2c2641;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mobile-bar .mobile-text { line-height: 1.05; text-align: left; flex: 1; padding: 0 10px; }
.mobile-bar .brand-big { font-size: 16px; font-weight: 800; color: #ffffff; letter-spacing: 0.3px; }
.mobile-bar .fullname { font-size: 12px; font-weight: 600; color: #f2f2f2; opacity: 0.95; }
.mobile-bar .avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-wrapper { position: relative; }
.user-dropdown {
  position: absolute;
  right: 0;
  top: 44px;
  background: #ffffff;
  color: #1f1f1f;
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.2);
  min-width: 180px;
  padding: 8px;
  z-index: 2000;
}
.user-line { padding: 8px 10px; font-size: 13px; }
.user-line.muted { color: #666; }
.logout-line {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #b81f2d;
  color: #fff;
  border: none;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
}

/* Show mobile header and hide desktop navbar on small screens */
@media (max-width: 680px) {
  /* On garde la navbar mais on masque ses blocs desktop et on montre mobile */
  .navbar .bloc-gauche,
  .navbar .bloc-centre,
  .navbar .bloc-droit { display: none; }
  .navbar .mobile-bar { display: flex; width: 100%; }
}
</style>
