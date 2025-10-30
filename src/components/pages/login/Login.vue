<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Connexion</h1>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="identifiant">Identifiant</label>
          <input
            id="identifiant"
            v-model="form.identifiant"
            type="text"
            placeholder="Email ou identifiant"
            required
          />
        </div>

        <div class="form-group">
          <label for="mdp">Mot de passe</label>
          <input
            id="mdp"
            v-model="form.mdp"
            type="password"
            placeholder="Mot de passe"
            required
          />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" :disabled="loading" class="btn-primary">
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>

      <p class="register-link">
        Pas encore de compte ? 
        <router-link to="/register">S'inscrire</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Login',
  
  data() {
    return {
      form: {
        identifiant: '',
        mdp: ''
      }
    }
  },

  computed: {
    ...mapState('auth', ['loading', 'error'])
  },

  methods: {
    ...mapActions('auth', ['login']),

    async handleLogin() {
      console.log("[v0] ========== LOGIN ATTEMPT ==========")
      console.log("[v0] Form data:", this.form)
      
      try {
        const response = await this.login(this.form)
        console.log("[v0] Login response:", response)

        if (response && response.success) {
          console.log("[v0] Login successful, redirecting to /")
          console.log("[v0] User:", response.user)
          console.log("[v0] Token:", response.token)
          
          this.$router.push('/')
        } else {
          console.error('[v0] Login failed:', response)
        }
      } catch (error) {
        console.error('[v0] Login error:', error)
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
}

.btn-primary {
  width: 100%;
  padding: 0.75rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-primary:hover:not(:disabled) {
  background: #5568d3;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.register-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
}

.register-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
