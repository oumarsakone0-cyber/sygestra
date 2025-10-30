import axios from "axios"
import { storage } from "@/utils/storage"

// URL de base de votre API PHP
const API_BASE_URL = "https://sygestra.com/api"

// Créer une instance Axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
})

// Intercepteur de requête - Ajouter automatiquement le token
apiClient.interceptors.request.use(
  (config) => {
    const token = storage.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Intercepteur de réponse - Gérer les erreurs d'authentification
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      // Token expiré ou invalide
      if (error.response.status === 401) {
        storage.clearAll()
        import("@/router").then((routerModule) => {
          const router = routerModule.default
          if (router.currentRoute.path !== "/login") {
            router.push("/login")
          }
        })
      }

      // Erreur serveur
      if (error.response.status >= 500) {
        console.error("Erreur serveur:", error.response.data)
      }
    }
    return Promise.reject(error)
  },
)

export default apiClient