import Vue from 'vue'
import { Store } from 'vuex'

declare module '*.vue' {
  export default Vue
}

declare module 'vue/types/vue' {
  interface Vue {
    $store: Store<any>
  }
}
