import Vuex from 'vuex'
import Vue from 'vue'

import menu from '@/store/menu'
import login from '@/store/login'
import loading from '@/store/loading'

Vue.use(Vuex)

const state = () => ({
  session: {
    token: localStorage.getItem(`token`) != null 
      ? localStorage.getItem(`user`) 
      : null,
    user: localStorage.getItem('user') != null 
      ? JSON.parse(localStorage.getItem('user')) 
      : null,
  },
})

const getters = {
  session: state => state.session,
  token: state => state.session && state.session.token
    ? state.session.token
    : null,
}

const mutations = {
  setSession(state, { token, user }){
    if(token && user) {
      state.session.token = token
      state.session.user = user
      localStorage.setItem(`token`, token)
      localStorage.setItem(`user`, JSON.stringify(user))
    } else {
      state.session.token = null
      state.session.user = null
    }
  },
}

const actions = {
  login({ commit }, payload){
    commit('session', payload)
  },
  logout({ commit }){
    commit('session')
  },
}

const store = new Vuex.Store({
  modules: {
    menu,
    login,
    loading,
  },
  state: state(),
  getters,
  mutations,
  actions,
})

export default store