import apiClient from "./axios"

export const usersAPI = {
  // Ajouter un utilisateur à son entreprise
  async addUser(userData) {
    try {
      const response = await apiClient.post("/add-user.php", userData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: "Erreur d'ajout d'utilisateur" }
    }
  },

  // Récupérer tous les utilisateurs de l'entreprise
  async getUsers() {
    try {
      const response = await apiClient.get("/get-users.php")
      return response.data
    } catch (error) {
      throw error.response?.data || { message: "Erreur de récupération des utilisateurs" }
    }
  },

  // Supprimer un utilisateur
  async deleteUser(userId) {
    try {
      const response = await apiClient.delete(`/delete-user.php?id=${userId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: "Erreur de suppression" }
    }
  },
}
