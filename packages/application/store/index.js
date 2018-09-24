// Need to find a better cookie parser method
var cookieparser = require('cookieparser')

export const state = () => ({
  auth: null,
  userId: null,
  userType: null,
  pageTitle: null,
  userPackets: []
})

export const mutations = {
  updateAuth (state, data) {
    state.auth = data
  },
  updateUserId (state, data) {
    state.userId = data
  },
  updateUserType (state, data) {
    state.userType = data
  },
  updatePageTitle (state, data) {
    state.pageTitle = data
  },
  updatePackets (state, data) {
    state.userPackets = data
  },
  clearAuth (state) {
    state.auth = null
  },
  clearUser (state) {
    state.userId = null
    state.userType = null
  },
  clearAppState (state) {
    Object.keys(state).forEach(key => {
      state[key] = null
    })
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let token = null
    let userId = null
    let userType = null
    if (req.headers.cookie) {
      let parsed = cookieparser.parse(req.headers.cookie)
      token = parsed.auth

      let user = JSON.parse(parsed.user)
      userId = user.uid
      userType = user.type
    }
    commit('updateAuth', token)
    commit('updateUserId', userId)
    commit('updateUserType', userType)
  }
}
