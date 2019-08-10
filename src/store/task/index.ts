import { Module, MutationTree, ActionTree } from 'vuex'
import { TaskState } from './state'
import { State as RootState } from '../state'
import { apolloClient } from '../../plugins/vue-apollo'
const createTask = require('@/graphql/createTask.gql')
const updateTask = require('@/graphql/updateTask.gql')
const deleteTask = require('@/graphql/deleteTask.gql')

export default class TaskStore implements Module<TaskState, RootState> {
  namespaced: boolean = true
  state: TaskState = {}
  mutations: MutationTree<TaskState> = {}
  actions: ActionTree<TaskState, RootState> = {
    async createTask ({ dispatch }, task) {
      const response = await apolloClient.mutate({
        mutation: createTask,
        variables: {
          ...task
        },
        fetchPolicy: 'no-cache'
      })
      return response.data.createTask
    },

    async updateTask (context, task) {
      const response = await apolloClient.mutate({
        mutation: updateTask,
        variables: {
          id: task.id,
          name: task.name,
          notes: task.notes,
          projectIds: task.projectIds
        },
        fetchPolicy: 'no-cache'
      })
      return response.data.updateTask
    },

    async deleteTask (context, taskId) {
      const response = await apolloClient.mutate({
        mutation: deleteTask,
        variables: {
          id: taskId
        },
        fetchPolicy: 'no-cache'
      })
      return response.data.deleteTask
    },
  }
}
