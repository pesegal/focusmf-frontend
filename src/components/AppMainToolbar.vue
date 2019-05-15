<template>
  <div class="AppMainToolbar">
    <v-toolbar app>
      <v-toolbar-side-icon @click="showDrawer(true)" />
      <v-toolbar-title class="headline text-uppercase">
        <span>Focus</span>
        <span class="font-weight-light">MF</span>
      </v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'

@Component
export default class AppMainToolbar extends Vue {
  @Emit()
  showDrawer (showDrawer: boolean): void {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.AppMainToolbar {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
}
</style>
