import { apolloClient } from '../../plugins/vue-apollo'
const getProjects = require('@/graphql/getProjects.gql')
const createProject = require('@/graphql/createProject.gql')
const updateProject = require('@/graphql/updateProject.gql')
const deleteProject = require('@/graphql/deleteProject.gql')

export default {
  namespaced: true,
  state: {
    projects: []
  },
  mutations: {
    setProjects (state, projects) {
      state.projects = projects
    },

    addProject (state, project) {
      state.projects.push(project)
    }
  },
  actions: {
    async getProjects ({ commit }) {
      const response = await apolloClient.query({
        query: getProjects,
        fetchPolicy: 'no-cache'
      })
      const projects = response.data.getProjects
      commit('setProjects', projects)
      return projects
    },

    async createProject ({ commit }, project) {
      const response = await apolloClient.mutate({
        mutation: createProject,
        variables: {
          name: project.name,
          colorName: project.colorName
        },
        fetchPolicy: 'no-cache'
      })
      commit('addProject', response.data.createProject)
      return response.data.createProject
    },

    updateProject (context, project) {
      return apolloClient.mutate({
        mutation: updateProject,
        variables: {
          id: project.id,
          name: project.name
        },
        fetchPolicy: 'no-cache'
      })
    },

    deleteProject (context, projectId) {
      return apolloClient.mutate({
        mutation: deleteProject,
        variables: {
          id: projectId
        },
        fetchPolicy: 'no-cache'
      })
    }
  }
}
