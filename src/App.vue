<template>
  <v-app>
    <app-navigation-menu />
    <v-content>
      <app-main-container />
    </v-content>
  </v-app>
</template>

<script>
import AppMainContainer from './components/AppMainContainer'
import AppNavigationMenu from './components/AppNavigationMenu'

export default {
  name: 'App',
  components: {
    AppMainContainer,
    AppNavigationMenu
  }
}
</script>
