<template>
<v-app :dark="isDark">
  <app-main-toolbar @show-drawer="onShowDrawer" />
  <app-navigation-drawer @toggle-theme="onToggleTheme" @show-drawer="onShowDrawer" :show-drawer="showDrawer" :is-dark="isDark" />
  <v-content>
    <router-view></router-view>
  </v-content>
</v-app>
</template>

<script>
import AppMainToolbar from '@/components/AppMainToolbar'
import AppNavigationDrawer from '@/components/AppNavigationDrawer'

export default {
  components: {
    AppMainToolbar,
    AppNavigationDrawer
  },
  data() {
    return {
      isDark: false,
      showDrawer: false
    }
  },

  methods: {
    onShowDrawer(showDrawer) {
      this.showDrawer = showDrawer
    },

    onToggleTheme(isDark) {
      this.isDark = isDark
    }
  }
}
</script>
