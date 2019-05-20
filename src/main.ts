import Vue from 'vue'
import '@/plugins/vuetify'
import '@/plugins/vue-apollo'
import '@/plugins/vuex'
import App from '@/App.vue'
import router from '@/router'
import { createProvider } from './plugins/vue-apollo'

Vue.config.productionTip = false

new Vue({
  router,
  store, //TODO(peter): figure out how to get the proper type annotations for this object
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
