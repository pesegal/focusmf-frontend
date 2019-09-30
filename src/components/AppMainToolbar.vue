<template>
  <div class="AppMainToolbar">
    <v-toolbar app>
      <v-toolbar-side-icon @click="showDrawer(true)" />
      <v-toolbar-title class="headline text-uppercase">
        <span>Focus</span>
        <span class="font-weight-light">MF</span>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn
          flat
          @click="logout"
        >
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn () {
      return !!this.$store.state.authorization
    }
  },

  methods: {
    logout () {
      this.$store.commit('auth/setAuth', '')
      this.$router.push('/login')
    },
    showDrawer(showDrawer) {
      this.$emit('show-drawer', showDrawer)
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
