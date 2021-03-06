// Need to find a better cookie parser method
var cookieparser = require('cookieparser')

export const state = () => ({
  auth: null,
  userId: null,
  userType: null,
  profileId: null,
  pageTitle: null,
  userFirstName: null,
  userLastName: null,
  userPackets: [],
  userDoctors: [],
  userPatients: []
})

export const mutations = {
  updateAuth (state, data) {
    state.auth = data
  },
  updateUserId (state, data) {
    state.userId = data
  },
  updateProfileId (state, data) {
    state.profileId = data
  },
  updateUserType (state, data) {
    state.userType = data
  },
  updateUserFirstName (state, data) {
    state.userFirstName = data
  },
  updateUserLastName (state, data) {
    state.userLastName = data
  },
  updatePageTitle (state, data) {
    state.pageTitle = data
  },
  updatePackets (state, data) {
    state.userPackets = data
  },
  updateDoctors (state, data) {
    state.userDoctors = data
  },
  updatePatients (state, data) {
    state.userPatients = data
  },
  clearAuth (state) {
    state.auth = null
  },
  clearUser (state) {
    state.userId = null
    state.profileId = null
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
    let profileId = null
    let userType = null
    if (req.headers.cookie) {
      let parsed = cookieparser.parse(req.headers.cookie)
      token = parsed.auth

      let user = JSON.parse(parsed.user)
      userId = user.uid
      userType = user.type
      profileId = user.profileId
    }
    commit('updateAuth', token)
    commit('updateUserId', userId)
    commit('updateProfileId', profileId)
    commit('updateUserType', userType)
  }
}
