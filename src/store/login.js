import axios from 'axios'

const TAG = `login.js`;

const state = () => ({
  session: null,
  perProfCfg: null,
  error: null,
  themeColor: {
    nav_bar_bg: '#aaaaaa',
    nav_bar_text: '#111111'
  },
})

const getters = {
  token: state => state.session ? state.session.sessionId : null,
  user: state => state.session ? state.session.employee : null,
  canRegisterNoveltiesToAnyEmployee: state => state.perProfCfg
    ? state.perProfCfg.regAnyAttenNov
    : false,
  themeColor: state => state.themeColor,
}

const mutations = {
  setSession(state, session) {
    state.session = session
  },
  setError(state, error) {
    state.error = error
  },
  setPerProfCfg(state, perProfCfg) {
    state.perProfCfg = perProfCfg
  },
  clearState(statePrm) {
    Object.assign(statePrm, state())
  },
  setThemeColor(state, colors) {
    if (colors && colors.length > 0) {
      let newObj = colors.reduce((acc, cur) => ({ ...acc, [cur.element]: cur.value }), {});
      state.themeColor = newObj;
    }

  }
}

const actions = {
  logIn({ commit, dispatch }, { username, password, poolName, type = 'web' }) {

    return axios.post('/employee/login', {
        login: username,
        pass: password,
        poolName,
        type
      })
      .then(res => {
        commit('setSession', res.data)
        axios.defaults.headers = {
          Authorization: res.data.sessionId
        }
        return res.data
      })
      .catch(err => {
        commit('setError', 'Error en las credenciales')
        throw err
      })
      .then(session => {
          return Promise.all([
            dispatch('loadPerProfConf', session.sessionId),
            dispatch('getSysColorCfg')
          ])
      })  
  },
  getSysColorCfg({ commit, dispatch }) {
    return axios.get('/sysColorCfg/getAll')
      .then(res => {
        commit('setThemeColor', res.data)
      })
      .catch(err => {
        dispatch('logOut')
        commit('setError', 'No se encontro configuración del tema')
        throw err
      })
  },
  logOut({ dispatch }) {
    dispatch('clearAllState', null, { root: true })
    return new Promise(function (resolve, reject) {
      resolve()
    })
  },
  loadPerProfConf({ commit, dispatch }, token) {
    commit('startLoading')

    return axios.get('/perProfCfg/getFromSession')
      .then(res => {
        commit('setPerProfCfg', res.data)
      }).catch(err => {
        dispatch('logOut')
        commit('setError', 'No tiene permisos')
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