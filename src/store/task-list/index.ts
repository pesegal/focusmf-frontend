import { Module, MutationTree, ActionTree } from 'vuex'
import { TaskListState } from './state'
import { State as RootState } from '../state'
import { apolloClient } from '../../plugins/vue-apollo'
const findListsByUser = require('@/graphql/findListsByUser.gql')


export default class TaskListStore implements Module<TaskListState, RootState> {
  namespaced: boolean = true
  state: TaskListState = {
      tasks: []
  }
  mutations: MutationTree<TaskListState> = {
    setTasks (state: TaskListState, tasks: []) {
        state.tasks = tasks
    }
  }

  actions: ActionTree<TaskListState, RootState> = {
    async loadLists ({ commit }) {
      const response = await apolloClient.query({
        query: findListsByUser
      })
      commit('setTasks', response.data.findListsByUser)
    }
  }
}
