<template>
  <div class="profile-container">
    <h1>Mon Profil</h1>

    <div v-if="currentUser" class="profile-info">
      <div class="info-group">
        <label>Nom complet:</label>
        <p>{{ currentUser.prenom }} {{ currentUser.nom }}</p>
      </div>

      <div class="info-group">
        <label>Entreprise:</label>
        <p>{{ currentUser.entreprise }}</p>
      </div>

      <div class="info-group">
        <label>Titre:</label>
        <p>{{ currentUser.titre }}</p>
      </div>

      <div class="info-group">
        <label>Contact:</label>
        <p>{{ currentUser.contact }}</p>
      </div>

      <div class="permissions">
        <h3>Permissions</h3>
        <div class="permission-list">
          <span v-if="userPermissions.comptabilite" class="badge">Comptabilité</span>
          <span v-if="userPermissions.benne" class="badge">Benne</span>
          <span v-if="userPermissions.conteneur" class="badge">Conteneur</span>
          <span v-if="userPermissions.citerne" class="badge">Citerne</span>
          <span v-if="userPermissions.taxi" class="badge">Taxi</span>
          <span v-if="userPermissions.administration" class="badge">Administration</span>
        </div>
      </div>

      <button @click="handleLogout" class="btn-logout">
        Déconnexion
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Profile',

  computed: {
    ...mapGetters('auth', ['currentUser', 'userPermissions'])
  },

  methods: {
    ...mapActions('auth', ['logout']),

    handleLogout() {
      this.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
}

.profile-info {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.info-group {
  margin-bottom: 1.5rem;
}

.info-group label {
  font-weight: 600;
  color: #555;
  display: block;
  margin-bottom: 0.5rem;
}

.info-group p {
  color: #333;
  font-size: 1.1rem;
}

.permissions {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.permission-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.badge {
  background: #667eea;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.btn-logout {
  margin-top: 2rem;
  padding: 0.75rem 2rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.btn-logout:hover {
  background: #c82333;
}
</style>