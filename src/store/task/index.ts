import { Module, MutationTree, ActionTree } from 'vuex'
import { TaskState } from './state'
import { State as RootState } from '../state'
import { apolloClient } from '../../plugins/vue-apollo'
const createTask = require('@/graphql/createTask.gql')

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
      // TODO: update the tasks lists
      return response.data.createTask
    }
  }
}
