import { apolloClient } from '../../plugins/vue-apollo'
const createTask = require('@/graphql/createTask.gql')
const updateTask = require('@/graphql/updateTask.gql')
const deleteTask = require('@/graphql/deleteTask.gql')
const createTaskAction = require('@/graphql/createTaskAction.gql')

export default {
  namespaced: true,
  state: {
    currentWorkingTask: { id: null, name: null }
  },
  mutations: {
    setWorkingTask(state, currentTask) {
      state.currentWorkingTask = currentTask
    }
  },

  actions: {
    async createTask (context, task) {
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

    async createTaskAction (context, { id, start, end, action }) {
      const response = await apolloClient.mutate({
        mutation: createTaskAction,
        variables: {
          id: id,
          start: start,
          end: end,
          action: action
        },
        fetchPolicy: 'no-cache'
      })
      return response.data.createTaskAction
    }
  }
}
