import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        authorization: ""
    },
    getters: {},
    mutations: {
        setAuth (state, token: string) {
            state.authorization = token
        },
        clearAuth (state) {
            state.authorization = ""
        }
    },
    actions: {},
    modules: {}
})