import Vue from 'vue'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'

Vue.use(VueApollo)

export function createProvider (options = {}) {
  const apolloClient = new ApolloClient({
    uri: process.env.FMF_APOLLO_CLIENT_BASE_URL || 'http://localhost:3000'
  })

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient
  })

  return apolloProvider
}
