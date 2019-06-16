import Vue from 'vue'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'

Vue.use(VueApollo)

export const apolloClient = new ApolloClient({
  uri: process.env.FMF_APOLLO_CLIENT_BASE_URL || 'http://localhost:3000'
})

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})
