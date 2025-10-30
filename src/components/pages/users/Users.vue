<template>
  <div class="manage-users">
    <div class="header">
      <h1>Gestion des utilisateurs</h1>
      <p>Entreprise : {{ currentUser.entreprise }}</p>
    </div>

    <!-- Formulaire d'ajout d'utilisateur -->
    <div class="add-user-form">
      <h2>Ajouter un utilisateur</h2>
      <form @submit.prevent="addNewUser">
        <div class="form-row">
          <div class="form-group">
            <label>Identifiant (email) *</label>
            <input 
              v-model="userData.identifiant" 
              type="email" 
              required 
              placeholder="email@example.com"
            />
          </div>

          <div class="form-group">
            <label>Mot de passe *</label>
            <input 
              v-model="userData.mdp" 
              type="password" 
              required 
              placeholder="Mot de passe"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Nom *</label>
            <input 
              v-model="userData.nom" 
              type="text" 
              required 
              placeholder="Nom"
            />
          </div>

          <div class="form-group">
            <label>Prénom *</label>
            <input 
              v-model="userData.prenom" 
              type="text" 
              required 
              placeholder="Prénom"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Titre</label>
            <input 
              v-model="userData.titre" 
              type="text" 
              placeholder="Ex: Comptable, Manager..."
            />
          </div>

          <div class="form-group">
            <label>Contact</label>
            <input 
              v-model="userData.contact" 
              type="text" 
              placeholder="+33612345678"
            />
          </div>
        </div>

        <!-- Permissions -->
        <div class="permissions-section">
          <h3>Permissions</h3>
          <div class="permissions-grid">
            <label class="checkbox-label">
              <input type="checkbox" v-model="userData.conteneur" :true-value="1" :false-value="0" />
              <span>Conteneur</span>
            </label>

            <label class="checkbox-label">
              <input type="checkbox" v-model="userData.benne" :true-value="1" :false-value="0" />
              <span>Benne</span>
            </label>

            <label class="checkbox-label">
              <input type="checkbox" v-model="userData.citerne" :true-value="1" :false-value="0" />
              <span>Citerne</span>
            </label>

            <label class="checkbox-label">
              <input type="checkbox" v-model="userData.taxi" :true-value="1" :false-value="0" />
              <span>Taxi</span>
            </label>

            <label class="checkbox-label">
              <input type="checkbox" v-model="userData.moto" :true-value="1" :false-value="0" />
              <span>Moto</span>
            </label>

            <label class="checkbox-label">
              <input type="checkbox" v-model="userData.administration" :true-value="1" :false-value="0" />
              <span>Administration</span>
            </label>

            <label class="checkbox-label">
              <input type="checkbox" v-model="userData.comptabilite" :true-value="1" :false-value="0" />
              <span>Comptabilité</span>
            </label>

            <label class="checkbox-label">
              <input type="checkbox" v-model="userData.facturation" :true-value="1" :false-value="0" />
              <span>Facturation</span>
            </label>

            <label class="checkbox-label">
              <input type="checkbox" v-model="userData.cloud" :true-value="1" :false-value="0" />
              <span>Cloud</span>
            </label>

            <label class="checkbox-label">
              <input type="checkbox" v-model="userData.lecture" :true-value="1" :false-value="0" />
              <span>Lecture</span>
            </label>
          </div>
        </div>

        <!-- Messages -->
        <div v-if="successMessage" class="alert alert-success">
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="alert alert-error">
          {{ errorMessage }}
        </div>

        <button type="submit" class="btn-primary" :disabled="loading">
          {{ loading ? 'Ajout en cours...' : 'Ajouter l\'utilisateur' }}
        </button>
      </form>
    </div>

    <!-- Liste des utilisateurs -->
    <div class="users-list">
      <h2>Utilisateurs de l'entreprise</h2>
      <div v-if="loadingUsers" class="loading">Chargement...</div>
      <table v-else-if="users.length > 0">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Titre</th>
            <th>Contact</th>
            <th>Permissions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id_user">
            <td>{{ user.nom }}</td>
            <td>{{ user.prenom }}</td>
            <td>{{ user.identifiant }}</td>
            <td>{{ user.titre || '-' }}</td>
            <td>{{ user.contact || '-' }}</td>
            <td>
              <div class="permissions-badges">
                <span v-if="user.comptabilite" class="badge">Compta</span>
                <span v-if="user.facturation" class="badge">Factu</span>
                <span v-if="user.conteneur" class="badge">Conteneur</span>
                <span v-if="user.benne" class="badge">Benne</span>
                <span v-if="user.citerne" class="badge">Citerne</span>
                <span v-if="user.taxi" class="badge">Taxi</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="no-data">Aucun utilisateur trouvé</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { usersAPI } from '@/api/users'

export default {
  name: 'ManageUsers',
  
  data() {
    return {
      userData: {
        identifiant: '',
        mdp: '',
        nom: '',
        prenom: '',
        titre: '',
        contact: '',
        conteneur: 0,
        benne: 0,
        citerne: 0,
        taxi: 0,
        moto: 0,
        administration: 0,
        comptabilite: 0,
        facturation: 0,
        cloud: 0,
        lecture: 0
      },
      users: [],
      loading: false,
      loadingUsers: false,
      successMessage: '',
      errorMessage: ''
    }
  },

  computed: {
    ...mapGetters('auth', ['currentUser'])
  },

  mounted() {
    this.loadUsers()
  },

  methods: {
    async addNewUser() {
      this.loading = true
      this.successMessage = ''
      this.errorMessage = ''

      try {
        const response = await usersAPI.addUser(this.userData)
        console.log('Utilisateur ajouté:', response)
        
        this.successMessage = 'Utilisateur ajouté avec succès !'
        
        // Réinitialiser le formulaire
        this.resetForm()
        
        // Recharger la liste des utilisateurs
        this.loadUsers()
        
        // Effacer le message après 5 secondes
        setTimeout(() => {
          this.successMessage = ''
        }, 5000)
        
      } catch (error) {
        console.error('Erreur:', error)
        this.errorMessage = error.response?.data?.message || 'Erreur lors de l\'ajout de l\'utilisateur'
      } finally {
        this.loading = false
      }
    },

    async loadUsers() {
      this.loadingUsers = true
      try {
        const response = await usersAPI.getCompanyUsers()
        this.users = response.users || []
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error)
      } finally {
        this.loadingUsers = false
      }
    },

    resetForm() {
      this.userData = {
        identifiant: '',
        mdp: '',
        nom: '',
        prenom: '',
        titre: '',
        contact: '',
        conteneur: 0,
        benne: 0,
        citerne: 0,
        taxi: 0,
        moto: 0,
        administration: 0,
        comptabilite: 0,
        facturation: 0,
        cloud: 0,
        lecture: 0
      }
    }
  }
}
</script>

<style scoped>
.manage-users {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  margin-bottom: 30px;
}

.header h1 {
  font-size: 28px;
  margin-bottom: 5px;
}

.header p {
  color: #666;
  font-size: 14px;
}

.add-user-form {
  background: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.add-user-form h2 {
  font-size: 20px;
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.form-group {
  flex: 1;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:focus {
  outline: none;
  border-color: #4CAF50;
}

.permissions-section {
  margin: 20px 0;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
}

.permissions-section h3 {
  font-size: 16px;
  margin-bottom: 15px;
}

.permissions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-label input {
  margin-right: 8px;
  cursor: pointer;
}

.checkbox-label span {
  font-size: 14px;
}

.alert {
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.alert-success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert-error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.btn-primary {
  background: #4CAF50;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-primary:hover:not(:disabled) {
  background: #45a049;
}

.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.users-list {
  background: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.users-list h2 {
  font-size: 20px;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f5f5f5;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  font-weight: 600;
  font-size: 14px;
}

td {
  font-size: 14px;
}

.permissions-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.badge {
  background: #e3f2fd;
  color: #1976d2;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.loading, .no-data {
  text-align: center;
  padding: 20px;
  color: #666;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }
  
  .permissions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  table {
    font-size: 12px;
  }
  
  th, td {
    padding: 8px;
  }
}
</style>