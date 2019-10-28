import { apolloClient } from '../../plugins/vue-apollo'
const findListsByUser = require('@/graphql/findListsByUser.gql')
const createList = require('@/graphql/createList.gql')
const deleteList = require('@/graphql/deleteList.gql')
const updateList = require('@/graphql/updateList.gql')

export default {
  namespaced: true,
  state: {
    lists: []
  },
  mutations: {
    setLists (state, lists) {
      state.lists = lists
    },

    updateTasksForList (state, { id, tasks }) {
      state.lists.forEach(list => {
        if (list.id == id) {
          list.tasks = tasks
        }
      })
    },

    updateList (state, newList) {
      state.lists.forEach(list => {
        if (list.id === newList.id) {
          Object.assign(list, newList)
        }
      })
    }
  },
  actions:  {
    async loadLists ({ commit }) {
      const response = await apolloClient.query({
        query: findListsByUser,
        fetchPolicy: 'no-cache'
      })
      const lists = response.data.findListsByUser
      commit('setLists', lists)
      return lists
    },

    async createList (context, { name, position }) {
      const response = await apolloClient.mutate({
        mutation: createList,
        variables: {
          name,
          position
        },
        fetchPolicy: 'no-cache'
      })
      return response.data.createList
    },

    async deleteList (context, listId) {
      const response = await apolloClient.mutate({
        mutation: deleteList,
        variables: {
          id: listId
        },
        fetchPolicy: 'no-cache'
      })
      return response.data.createList
    },

    async updateList (context, { id, name, position }) {
      const response = await apolloClient.mutate({
        mutation: updateList,
        variables: {
          id,
          name,
          position
        },
        fetchPolicy: 'no-cache'
      })
      return response.data.updateList
    }
  }
}
