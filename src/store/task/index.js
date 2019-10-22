import { apolloClient } from '../../plugins/vue-apollo'
const createTask = require('@/graphql/createTask.gql')
const updateTask = require('@/graphql/updateTask.gql')
const deleteTask = require('@/graphql/deleteTask.gql')

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
  }
}
