import apiClient from "./axios"

export const authAPI = {
  // Connexion
  async login(credentials) {
    try {
      const response = await apiClient.post("/login.php", credentials)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: "Erreur de connexion" }
    }
  },

  // Inscription
  async register(userData) {
    try {
      const response = await apiClient.post("/register.php", userData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: "Erreur d'inscription" }
    }
  },

  // Vérifier le token
  async verifyToken() {
    try {
      const response = await apiClient.get("/verify-token.php")
      return response.data
    } catch (error) {
      throw error.response?.data || { message: "Token invalide" }
    }
  },

  // Mettre à jour le profil
  async updateProfile(profileData) {
    try {
      const response = await apiClient.put("/update-profile.php", profileData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: "Erreur de mise à jour" }
    }
  },

  // Changer le mot de passe
  async changePassword(passwordData) {
    try {
      const response = await apiClient.put("/update-profile.php", passwordData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: "Erreur de changement de mot de passe" }
    }
  },
}
