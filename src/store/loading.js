
const state = () => ({
  loadingIndicator: {
    indeterminate: true,
    percentage: 0,
    visible: false,
  },
})

const getters = {
  isLoadingIndicatorVisible: state => state.loadingIndicator.visible,
  isLoadingIndicatorIndeterminate: state => state.loadingIndicator.indeterminate,
  percentageLoaded: state => state.loadingIndicator.percentage,
}

const mutations = {
  setLoadingIndicatorVisibility(state, visible){
    state.loadingIndicator.visible = visible
  },
  setLoadingIndicator(state, { indeterminate, percentage }){
    state.loadingIndicator.indeterminate = indeterminate
    state.loadingIndicator.percentage = indeterminate ? 0 : percentage
  },
}

const actions = {
  showProgress({ commit }){
    commit('setLoadingIndicatorVisibility', true)
    commit('setLoadingIndicator', { indeterminate: true })
  },
  setProgressPercentage({ commit }, percentage){
    const isValidPercentage = percentage >= 0 && percentage <= 100
    const per = isValidPercentage ? percentage : 0
    commit('setLoadingIndicatorVisibility', true)
    commit('setLoadingIndicator', { indeterminate: false, percentage: per  })
  },
  hideProgress({ commit }, millis){
    millis = millis ? millis : 0
    setTimeout(() => commit('setLoadingIndicatorVisibility', false), millis)
  },
}

export default {
  namespaced: true,
  state: state(),
  getters,
  mutations,
  actions,
}