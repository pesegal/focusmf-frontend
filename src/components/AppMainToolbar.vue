<template>
  <div class="AppMainToolbar">
    <v-app-bar app>
      <v-app-bar-nav-icon @click="showDrawer(true)" />
      <v-toolbar-title class="headline text-uppercase">
        <span>Focus</span>
        <span class="font-weight-light">MF</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        text
        @click="logout"
      >
        Logout
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'

@Component
export default class AppMainToolbar extends Vue {

  get isLoggedIn () {
    return !!this.$store.state.authorization
  }

  @Emit()
  showDrawer (showDrawer: boolean): void {}

  logout () {
    this.$store.commit('auth/setAuth', '')
    this.$router.push('/login')
  }
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
