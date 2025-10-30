// Gestion centralisée du localStorage
const TOKEN_KEY = "sygestra_token"
const USER_KEY = "sygestra_user"

export const storage = {
  // Token
  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },

  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token)
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY)
  },

  // User
  getUser() {
    const user = localStorage.getItem(USER_KEY)
    return user ? JSON.parse(user) : null
  },

  setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  removeUser() {
    localStorage.removeItem(USER_KEY)
  },

  // Clear all
  clearAll() {
    this.removeToken()
    this.removeUser()
  },
}
