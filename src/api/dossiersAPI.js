import apiClient from "./axios"

export const dossiersAPI = {
  
   
   
  async addDossier(formData) {
    try {
      const response = await apiClient.post("/add-dossier.php", formData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: "Erreur lors de la création du dossier" }
    }
  },

  /**
   * 📋 Récupérer la liste des dossiers
   */
  async getDossiers() {
    try {
      const response = await apiClient.get("/get-dossiers.php")
      return response.data.dossiers
    } catch (error) {
      throw error.response?.data || { message: "Erreur de récupération des dossiers" }
    }
  },

  /**
   * 🔍 Récupérer un dossier précis (par ID)
   */
  async getDossierById(id) {
    try {
      const response = await apiClient.get(`/get-dossier.php?id=${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: "Erreur de récupération du dossier" }
    }
  },

  /**
   * ✏️ Mettre à jour un dossier
   */
  async updateDossier(id, formData) {
    try {
      const response = await apiClient.put(`/update-dossier.php?id=${id}`, formData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: "Erreur de mise à jour du dossier" }
    }
  },

  /**
   * ❌ Supprimer un dossier
   */
  async deleteDossier(id) {
    try {
      const response = await apiClient.delete(`/delete-dossier.php?id=${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: "Erreur de suppression du dossier" }
    }
  },

  /**
   * 🔢 Générer un numéro de dossier basé sur armateur + mois/année
   * (pour éviter que ce soit fait côté front)
   */
  async generateNumero(armateur) {
    try {
      const response = await apiClient.get(`/generate-numero.php?armateur=${armateur}`)
      return response.data.numero_dossier
    } catch (error) {
      throw error.response?.data || { message: "Erreur de génération du numéro" }
    }
  },
}
