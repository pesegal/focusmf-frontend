import { Module, MutationTree, ActionTree } from 'vuex'
import { TaskState } from './state'
import { State as RootState } from '../state'
import { apolloClient } from '../../plugins/vue-apollo'
const findListsByUser = require('@/graphql/findListsByUser.gql')
const createList = require('@/graphql/createList.gql')
const deleteList = require('@/graphql/deleteList.gql')
const updateList = require('@/graphql/updateList.gql')

export default class TaskStore implements Module<TaskState, RootState> {
  namespaced: boolean = true
  state: TaskState = {}
  mutations: MutationTree<TaskState> = {}
  actions: ActionTree<TaskState, RootState> = {
    async createTask ({ commit }) {
      const response = await apolloClient.query({
        query: findListsByUser,
        fetchPolicy: 'no-cache'
      })
      const tasks = response.data.findListsByUser
      commit('setTasks', tasks)
      return tasks
    }
  }
}
