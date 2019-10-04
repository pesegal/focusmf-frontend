export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    setAuth(state, token) {
      state.token = token
    },
    clearAuth(state) {
      state.token = ''
    }
  }
}
