import { authAPI } from "@/api/auth"
import { storage } from "@/utils/storage"

const state = {
  user: storage.getUser(),
  token: storage.getToken(),
  isAuthenticated: !!storage.getToken(),
  loading: false,
  error: null,
}

const getters = {
  currentUser: (state) => state.user,
  isAuthenticated: (state) => state.isAuthenticated,
  userEntreprise: (state) => state.user?.entreprise,
  userPermissions: (state) => ({
    conteneur: state.user?.conteneur,
    benne: state.user?.benne,
    citerne: state.user?.citerne,
    taxi: state.user?.taxi,
    moto: state.user?.moto,
    administration: state.user?.administration,
    comptabilite: state.user?.comptabilite,
    facturation: state.user?.facturation,
    cloud: state.user?.cloud,
    lecture: state.user?.lecture,
  }),
  hasPermission: (state) => (permission) => {
    return state.user?.[permission] === 1
  },
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
    state.isAuthenticated = !!user
    if (user) {
      storage.setUser(user)
    }
  },

  SET_TOKEN(state, token) {
    state.token = token
    if (token) {
      storage.setToken(token)
    }
  },

  SET_LOADING(state, loading) {
    state.loading = loading
  },

  SET_ERROR(state, error) {
    state.error = error
  },

  LOGOUT(state) {
    state.user = null
    state.token = null
    state.isAuthenticated = false
    storage.clearAll()
  },
}

const actions = {
  // Connexion
  async login({ commit }, credentials) {
    console.log("[v0] ========== STORE LOGIN ACTION ==========")
    console.log("[v0] Credentials:", credentials)

    commit("SET_LOADING", true)
    commit("SET_ERROR", null)

    try {
      const response = await authAPI.login(credentials)
      console.log("[v0] API response:", response)

      if (response.success) {
        console.log("[v0] Setting token:", response.data.token)
        commit("SET_TOKEN", response.data.token)

        console.log("[v0] Setting user:", response.data.user)
        commit("SET_USER", response.data.user)

        console.log("[v0] Login action completed successfully")
        return response
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      console.error("[v0] Login action error:", error)
      commit("SET_ERROR", error.message || "Erreur de connexion")
      throw error
    } finally {
      commit("SET_LOADING", false)
    }
  },

  // Inscription
  async register({ commit }, userData) {
    commit("SET_LOADING", true)
    commit("SET_ERROR", null)

    try {
      const response = await authAPI.register(userData)

      if (response.success) {
        commit("SET_TOKEN", response.data.token)
        commit("SET_USER", response.data.user)
        return response
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      commit("SET_ERROR", error.message || "Erreur d'inscription")
      throw error
    } finally {
      commit("SET_LOADING", false)
    }
  },

  // Vérifier le token au chargement de l'app
  async checkAuth({ commit, state }) {
    console.log("[v0] ========== CHECK AUTH ==========")
    console.log("[v0] Current token:", state.token)

    if (!state.token) {
      console.log("[v0] No token found, skipping checkAuth")
      return false
    }

    try {
      const response = await authAPI.verifyToken()
      console.log("[v0] Verify token response:", response)

      if (response.success) {
        console.log("[v0] Token valid, setting user:", response.data.user)
        commit("SET_USER", response.data.user)
        return true
      } else {
        console.log("[v0] Token invalid, logging out")
        commit("LOGOUT")
        return false
      }
    } catch (error) {
      console.error("[v0] CheckAuth error:", error)
      commit("LOGOUT")
      return false
    }
  },

  // Mettre à jour le profil
  async updateProfile({ commit }, profileData) {
    commit("SET_LOADING", true)
    commit("SET_ERROR", null)

    try {
      const response = await authAPI.updateProfile(profileData)

      if (response.success) {
        commit("SET_TOKEN", response.data.token)
        commit("SET_USER", response.data.user)
        return response
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      commit("SET_ERROR", error.message || "Erreur de mise à jour")
      throw error
    } finally {
      commit("SET_LOADING", false)
    }
  },

  // Déconnexion
  logout({ commit }) {
    commit("LOGOUT")
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
