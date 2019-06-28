import { Module, MutationTree, ActionTree } from 'vuex'
import { TaskListState } from './state'
import { State as RootState } from '../state'
import { apolloClient } from '../../plugins/vue-apollo'
const findListsByUser = require('@/graphql/findListsByUser.gql')
const createList = require('@/graphql/createList.gql')
const deleteList = require('@/graphql/deleteList.gql')
const updateList = require('@/graphql/updateList.gql')

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
        query: findListsByUser,
        fetchPolicy: 'no-cache'
      })
      const tasks = response.data.findListsByUser
      commit('setTasks', tasks)
      return tasks
    },

    async createTaskList ({}, listName: String) {
      const response = await apolloClient.mutate({
        mutation: createList,
        variables: {
          name: listName
        },
        fetchPolicy: 'no-cache'
      })
      return response.data.createList
    },

    async deleteTaskList (context, taskListId) {
      const response = await apolloClient.mutate({
        mutation: deleteList,
        variables: {
          id: taskListId
        },
        fetchPolicy: 'no-cache'
      })
      return response.data.createList
    },

    async updateTaskList (context, taskList) {
      const response = await apolloClient.mutate({
        mutation: updateList,
        variables: {
          ...taskList
        },
        fetchPolicy: 'no-cache'
      })
      return response.data.updateList
    }
  }
}
