import Vue from "vue"
import VueRouter from "vue-router"
import store from "@/store"
import { storage } from "@/utils/storage"

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/components/pages/login/Login.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/components/pages/login/Register.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/components/HelloWorld.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/historique",
    name: "Historique",
    component: () => import("@/components/pages/dossier conteneur/historique.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/import",
    name: "ImportPage",
    component: () => import("@/components/pages/dossier conteneur/dossier import/ImportPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("@/components/pages/users/Users.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/comptabilite",
    name: "Comptabilite",
    component: () => import("@/components/pages/comptabilite/Comptabilite.vue"),
    meta: {
      requiresAuth: true,
      requiresPermission: "comptabilite",
    },
  },
  {
    path: "/bennes",
    name: "Bennes",
    component: () => import("@/components/pages/benne/Bennes.vue"),
    meta: {
      requiresAuth: true,
      requiresPermission: "benne",
    },
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

// Guard global pour vérifier l'authentification
router.beforeEach(async (to, from, next) => {
  console.log("[v0] ========== NAVIGATION GUARD ==========")
  console.log("[v0] Navigation:", from.path, "->", to.path)

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresPermission = to.meta.requiresPermission

  const token = storage.getToken()
  const isAuthenticated = store.getters["auth/isAuthenticated"]

  console.log("[v0] Token exists:", !!token)
  console.log("[v0] isAuthenticated (before checkAuth):", isAuthenticated)
  console.log("[v0] Route requires auth:", requiresAuth)

  // Si on a un token mais pas d'utilisateur dans le store, charger l'utilisateur
  if (token && !isAuthenticated) {
    console.log("[v0] Token exists but not authenticated, calling checkAuth...")
    try {
      await store.dispatch("auth/checkAuth")
      console.log("[v0] checkAuth completed successfully")
    } catch (error) {
      // Si le token est invalide, il sera supprimé par checkAuth
      console.error("[v0] Erreur lors de la vérification du token:", error)
    }
  }

  // Récupérer l'état d'authentification après la vérification
  const isAuthenticatedNow = store.getters["auth/isAuthenticated"]
  console.log("[v0] isAuthenticated (after checkAuth):", isAuthenticatedNow)

  // Route nécessite une authentification
  if (requiresAuth && !isAuthenticatedNow) {
    console.log("[v0] Auth required but not authenticated, redirecting to /login")
    next("/login")
    return
  }

  // Route nécessite une permission spécifique
  if (requiresPermission) {
    const hasPermission = store.getters["auth/hasPermission"](requiresPermission)
    console.log("[v0] Permission required:", requiresPermission, "- Has permission:", hasPermission)
    if (!hasPermission) {
      console.log("[v0] Permission denied, redirecting to /")
      next("/")
      return
    }
  }

  console.log("[v0] Navigation allowed, calling next()")
  next()
})

export default router
