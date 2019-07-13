import Vue from 'vue'
import Vuex from 'vuex'
import { State as RootState } from './state'
import AuthStore from './auth/index'
import TaskListStore from './task-list/index'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence<RootState>({
  storage: window.localStorage
})

export const store = new Vuex.Store<RootState>({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth: new AuthStore(),
    taskList: new TaskListStore()
  },
  plugins: [vuexLocal.plugin]
})
