import axios from 'axios'

const TAG = `login.js`;

const state = () => ({
  loading: false,
  token: null,
  error: null,
})

const getters = {
}

const mutations = {
  loadToken(state){
    state.loading = true
  },
  setToken(state, token){
    state.loading = false
    state.token = token
  },
  loginError(state, error){
    state.loading = false
    state.error = error
  },
  clear(statePrm) {
    Object.assign(statePrm, state())
  },
}

const actions = {
  logIn({ commit }, { username, password }){
    // TODO - perform login in server
    console.log(
      TAG,
      'TODO - perform login in server',
      username, password)
    commit('loadToken')
    setTimeout(2000, () => {
      commit('setToken', 'A token from server')
    })
  },
  logOut({ commit }){
    // TODO - perform logout in server
    console.log(
      TAG,
      'TODO - peform lougout in server')
    commit('clear')
  },
}

export default {
  namespaced: true,
  state: state(),
  getters,
  mutations,
  actions,
}