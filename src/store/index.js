import Vuex from 'vuex'
import Vue from 'vue'
import VuexPersistence from 'vuex-persist'

import login from '@/store/login'
import loading from '@/store/loading'

Vue.use(Vuex)

const state = () => ({
})

const getters = {
}

const mutations = {
}

const actions = {
  clearAllState({ commit }){
    commit('login/clearState')
    commit('loading/clearState')
  }
}

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = new Vuex.Store({
  modules: {
    login,
    loading,
  },
  state: state(),
  getters,
  mutations,
  actions,
  plugins: [
    vuexLocal.plugin
  ],
})

export default store