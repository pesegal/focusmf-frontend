import Vue from 'vue'
import '@/plugins/vuetify'
import '@/plugins/vue-apollo'
import App from '@/App.vue'
import router from '@/router'
import { apolloProvider } from './plugins/vue-apollo'
import { store } from '@/store/index'
import vuetify from '@/plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider: apolloProvider,
  vuetify,
  render: h => h(App)
}).$mount('#app')
