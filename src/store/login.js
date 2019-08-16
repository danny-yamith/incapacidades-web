import axios from 'axios'

const TAG = `login.js`;

const state = () => ({
  session: null,
  isAdmin: false,
  perEmployee: null,
  perContract: null,
  error: null,
  themeColor: {
    nav_bar_bg: '#aaaaaa',
    nav_bar_text: '#111111'
  },
})

const getters = {
  token: state => state.session ? state.session.sessionId : null,
  user: state => state.session ? state.session.employee : null,
  isAdmin: state => state.isAdmin,
  perEmployee: state => state.perEmployee,
  perContract: state => state.perContract,
  hasContract: state => Boolean(state.perContract),
  themeColor: state => state.themeColor,
}

const mutations = {
  setSession(state, session) {
    state.session = session
  },
  setError(state, error) {
    state.error = error
  },
  setIsAdmin(state, isAdmin){
    state.isAdmin = isAdmin
  },
  setPerEmployee(state, perEmployee){
    state.perEmployee = perEmployee
  },
  setPerContract(state, perContract){
    state.perContract = perContract
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
          dispatch('getPerProfCfgs', session.sessionId),
          dispatch('getSysColorCfg'),
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
  getPerEmployee({ commit, dispatch }, perEmployeeId){
    return axios.get(`/perEmployee/${perEmployeeId}`)
    .then(res => {
      commit('setPerEmployee', res.data)
      return res.data
    })
    .catch(err => {
      dispatch('logOut')
      commit('setError', 'El usuario no tiene contratos vigentes')
      throw err
    })
    .then(data => {
      return dispatch('getPerContract', data.id)
    })
  },
  logOut({ dispatch }) {
    // dispatch('clearAllState', null, { root: true })
    return new Promise(function (resolve, reject) {
      resolve()
    })
  },
  getPerProfCfgs({ commit, dispatch, getters }, token) {
    return axios.get('/perProfCfg/getFromSession')
      .then(res => {
        const isAdmin = res.data
          .map(perProfCfg => perProfCfg.regAnyAttenNov)
          .reduce((prev, act) => prev || act, false)

        if(!res.data.length) {
          console.log('El usuario no tiene perfiles asignados')
          throw new Error("El usuario no tiene perfiles asignados")
        }

        console.log(res)

        commit('setIsAdmin', isAdmin)
        return res.data
      }).catch(err => {
        const message = err.message ? err.message : 'No tiene permisos'
        dispatch('logOut')
        commit('setError', message)
        throw err
      })
      .then(isAdmin => {
        return dispatch('getPerEmployee', getters.user.id)
      })
  },
  getPerContract({ commit, dispatch, state, getters }){
    return axios.get('/perContract', {
      params: {
        empId: getters.perEmployee.id
      }
    })
    .then(res => {
      commit('setPerContract', res.data)
    })
    .catch(err => {
      if(!getters.hasContract && !getters.isAdmin){
        dispatch('logOut')
        commit('setError', 'El usuario no tiene contratos vigentes')
        throw err
      }
    })
  },
}

export default {
  namespaced: true,
  state: state(),
  getters,
  mutations,
  actions,
}