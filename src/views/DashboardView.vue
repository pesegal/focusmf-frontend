<template>
  <v-app :dark="isDark" class="DashboardView">
    <app-main-toolbar @show-drawer="onUpdateDrawerDisplayState" />
    <app-navigation-drawer
      :show-drawer="showDrawer"
      :is-dark="isDark"
      @toggle-theme="onToggleTheme"
      @update-drawer-display-state="onUpdateDrawerDisplayState"
    />
    <v-content class="DashboardView__content">
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

<style>
.DashboardView__content {
  padding-top: 0 !important;
}
</style>
