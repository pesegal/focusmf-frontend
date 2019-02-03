<template>
<v-app :dark="isDark">
  <app-main-toolbar @show-drawer="onUpdateDrawerDisplayState" />
  <app-navigation-drawer @toggle-theme="onToggleTheme" @update-drawer-display-state="onUpdateDrawerDisplayState" :show-drawer="showDrawer" :is-dark="isDark" />
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
    onUpdateDrawerDisplayState(showDrawer) {
      this.showDrawer = showDrawer
    },

    onToggleTheme(isDark) {
      this.isDark = isDark
    }
  }
}
</script>
