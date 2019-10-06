import Vue from 'vue'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'
import { store } from '../store/index'

Vue.use(VueApollo)

export const apolloClient = new ApolloClient({
  uri: '/graphql',
  request: async operation => {
    operation.setContext({
      headers: {
        authorization: store.state.auth.token
      }
    })
  }
})

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})
