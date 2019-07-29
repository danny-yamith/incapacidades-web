import axios from 'axios'

const TAG = `login.js`;

const state = () => ({
  session: null,
  perProfCfg: null,
  error: null,
})

const getters = {
  token: state => state.session ? state.session.sessionId : null,
  user: state => state.session ? state.session.employee : null,
  canRegisterNoveltiesToAnyEmployee: state => state.perProfCfg
    ? state.perProfCfg.regAnyAttenNov 
    : false,
}

const mutations = {
  setSession(state, session){
    state.session = session
  },
  setError(state, error){
    state.error = error
  },
  setPerProfCfg(state, perProfCfg){
    state.perProfCfg = perProfCfg
  },
  clearState(statePrm) {
    Object.assign(statePrm, state())
  },
}

const actions = {
  logIn({ commit, dispatch }, { username, password, poolName, type = 'web' }){

    return axios.post('/employee/login', {
      login: username,
      pass: password,
      poolName,
      type
    }).then(res => {
      console.log(res)
      commit('setSession', res.data)
      return res.data
    }).then(session => {
      console.log('session', session)
      return dispatch('loadPerProfConf', session.sessionId)
    }).catch(err => {
      console.log(err)
      commit('setError', err)
      throw err
    })
  },
  logOut({ dispatch }){
    dispatch('clearAllState', null, { root: true })
    return new Promise(function(resolve, reject){
      resolve()
    })
  },
  loadPerProfConf({commit, dispatch}, token){
    commit('startLoading')

    return axios.get('/perProfCfg/getFromSession')
      .then(res => {
        console.log('perProfCfg', res.data)
        commit('setPerProfCfg', res.data)
      }).catch(err => {
        console.log(err)
        commit('setError', err)
        throw err
      })
  }
}

export default {
  namespaced: true,
  state: state(),
  getters,
  mutations,
  actions,
}