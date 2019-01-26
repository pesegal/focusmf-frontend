<template>
  <div class="AppNavigationMenu">
    <v-toolbar app>
      <v-toolbar-side-icon @click="toggleDrawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>Focus</span>
        <span class="font-weight-light">MF</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat>
        <span class="mr-2">Login</span>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'AppNavigationMenu',

  methods: {
    toggleDrawer () {
      this.$emit('toggle-drawer')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.AppNavigationMenu {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
}
</style>
