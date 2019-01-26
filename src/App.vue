<template>
<v-app :dark="isDark">
  <app-navigation-menu @toggle-drawer="onToggleDrawer" />
  <v-navigation-drawer v-model="showDrawer" absolute temporary>
    <v-list>
      <v-list-tile v-for="item in items" :key="item.title" @click="onClickNavigationItem(item)">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile>
        <v-list-tile-action>
          <v-switch v-model="isDark"></v-switch>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-icon>{{ themeIcon }}</v-icon>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>

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
  },
  data() {
    return {
      isDark: true,
      themeIcon: 'brightness_3',
      showDrawer: false,
      items: [{
          title: 'Tasks',
          icon: 'view_list'
        },
        {
          title: 'Timer',
          icon: 'alarm'
        },
        {
          title: 'Stats',
          icon: 'insert_chart_outlined'
        },
        {
          title: 'Settings',
          icon: 'settings_applications'
        }
      ]
    }
  },

  methods: {
    onToggleDrawer() {
      this.showDrawer = !this.showDrawer
    },

    onClickNavigationItem(item) {}
  },

  watch: {
    isDark () {
      this.themeIcon = this.isDark ? 'brightness_3' : 'brightness_5'
    }
  }
}
</script>
