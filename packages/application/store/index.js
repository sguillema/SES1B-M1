// Need to find a better cookie parser method
var cookieparser = require('cookieparser')

export const state = () => ({
  sidebar: false,
  auth: null,
  userId: null
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  updateAuth (state, data) {
    state.auth = data
  },
  updateUserId (state, data) {
    state.userId = data
  },
  clearAuth (state) {
    state.auth = null
  },
  clearUserId (state) {
    state.userId = null
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let token = null
    let userId = null
    if (req.headers.cookie) {
      let parsed = cookieparser.parse(req.headers.cookie)
      token = parsed.auth
      userId = parsed.userId
    }
    commit('updateAuth', token)
    commit('updateUserId', userId)
  }
}
