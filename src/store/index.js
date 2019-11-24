import Vue from 'vue'
import Vuex from 'vuex'
import AuthStore from './auth/index'
import ListStore from './list/index'
import TaskStore from './task/index'
import ProjectStore from './project/index'
import VuexPersistence from 'vuex-persist'
import TimerStore from './timer/index'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth']
})

export const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth: AuthStore,
    list: ListStore,
    task: TaskStore,
    project: ProjectStore,
    timer: TimerStore
  },
  plugins: [vuexLocal.plugin]
})
