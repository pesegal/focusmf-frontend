<template>
  <div class="AppMainToolbar">
    <v-toolbar app>
      <v-toolbar-side-icon @click="showDrawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>Focus</span>
        <span class="font-weight-light">MF</span>
      </v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'AppMainToolbar',

  methods: {
    showDrawer () {
      this.$emit('show-drawer', true)
    }
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
