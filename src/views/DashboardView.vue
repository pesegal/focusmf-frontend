<template>
  <div class="chrome-container">
    <div class="surface">
      <div class="content">
        <div class="board-wrapper">
          <div class="board-main-content">
            <app-main-toolbar @show-drawer="onUpdateDrawerDisplayState" />
            <app-navigation-drawer
              :show-drawer="showDrawer"
              :is-dark="isDark"
              @toggle-theme="onToggleTheme"
              @update-drawer-display-state="onUpdateDrawerDisplayState"
            />
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AppMainToolbar from '@/components/AppMainToolbar.vue'
import AppNavigationDrawer from '@/components/AppNavigationDrawer.vue'
import Component from 'vue-class-component'
import { Vue } from 'vue-property-decorator'

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
html {
  height: 100%;
  overflow: auto !important;
}

body {
  height: 100%;
  position: relative;
  overflow: hidden;
}

.chrome-container {
  height: 100%;
  position: relative;
  overflow: hidden;
  z-index: 1;
}
.surface {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.content {
  flex-grow: 1;
  overflow: auto !important;
  outline: none;
  position: relative;
}
.board-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.board-main-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 0;
}
</style>
