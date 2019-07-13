import { Module, MutationTree } from 'vuex'
import { AuthState } from './state'
import { State as RootState } from '../state'

export default class AuthStore implements Module<AuthState, RootState> {
  namespaced: boolean = true
  state: AuthState = {
    token: ''
  }
  mutations: MutationTree<AuthState> = {
    setAuth(state: AuthState, token: string) {
      state.token = token
    },
    clearAuth(state: AuthState) {
      state.token = ''
    }
  }
}
