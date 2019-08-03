import { Module, MutationTree, ActionTree } from 'vuex'
import { ProjectState } from './state'
import { Project } from './project'
import { State as RootState } from '../state'
import { apolloClient } from '../../plugins/vue-apollo'
const getProjects = require('@/graphql/getProjects.gql')
const createProject = require('@/graphql/createProject.gql')

export default class TaskListStore implements Module<ProjectState, RootState> {
  namespaced: boolean = true
  state: ProjectState = {
    projects: []
  }
  mutations: MutationTree<ProjectState> = {
    setProjects (state: ProjectState, projects: []) {
      state.projects = projects
    },

    addProject (state: ProjectState, project: Project) {
      state.projects.push(project)
    }
  }

  actions: ActionTree<ProjectState, RootState> = {
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
    }
  }
}
