<template>
  <v-app :dark="isDark">
    <app-main-toolbar @show-drawer="onUpdateDrawerDisplayState" />
    <app-navigation-drawer
      :show-drawer="showDrawer"
      :is-dark="isDark"
      @toggle-theme="onToggleTheme"
      @update-drawer-display-state="onUpdateDrawerDisplayState"
    />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import AppMainToolbar from '@/components/AppMainToolbar.vue'
import AppNavigationDrawer from '@/components/AppNavigationDrawer.vue'
import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';

@Component({
  components: {
    AppMainToolbar,
    AppNavigationDrawer
  }
})
export default class DashboardView extends Vue {

  isDark: boolean = false
  showDrawer: boolean = false

  onUpdateDrawerDisplayState(showDrawer: boolean): void {
    this.showDrawer = showDrawer
  }

  onToggleTheme(isDark: boolean): void {
    this.isDark = isDark
  }
}
</script>
