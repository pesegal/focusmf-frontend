declare module 'vue/types/vue' {
  import Vue from 'vue'
  import { Store } from 'vuex'
  interface Vue {
    $store: Store<any>
  }
}
