// Need to find a better cookie parser method
var cookieparser = require('cookieparser')

export const state = () => ({
  auth: null,
  userId: null,
  userType: null
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
  clearAuth (state) {
    state.auth = null
  },
  clearUser (state) {
    state.userId = null
    state.userType = null
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
