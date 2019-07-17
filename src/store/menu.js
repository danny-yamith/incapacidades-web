import axios from 'axios'

const state = () => ({
  isOpen: false,
  loading: false,
  todos: [],
  error: null,
})

const getters = {
  isOpen: state => state.isOpen,
  todos: state => state.todos,
}

const mutations = {
  setIsOpen(state, isOpen){
    state.isOpen = isOpen
  },
  loadingTodos(state){
    state.loading = true
    state.todos = []
    state.error = null
  },
  loadedTodos(state, todos) {
    state.loading = false
    state.todos = todos
  },
  errorTodos(state, error){
    state.loading = false
    state.error = error
  },
}

const actions = {
  open({ commit }){
    commit('setIsOpen', true)
  },
  close({ commit }){
    commit('setIsOpen', false)
  },
  async getTodos({ commit }){
    commit('loadingTodos')
    return axios.get(
      'https://jsonplaceholder.typicode.com/todos/1'
    )
    .then(res => {
      commit('loadedTodos', res.data)
      return res
    })
    .catch(error => { 
      commit('errorTodos', error) 
      throw error
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