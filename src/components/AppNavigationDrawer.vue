<template>
  <v-navigation-drawer :value="showDrawer" @input="onUpdateShowDrawer" absolute temporary>
    <v-list>
      <v-list-tile v-for="item in items" :key="item.title" :to="item.to" @click="onClickNavigationItem(item)">
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
          <v-switch :input-value="isDark" @change="onToggleTheme"></v-switch>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-icon>{{ themeIcon }}</v-icon>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    showDrawer: {
      type: Boolean,
      required: false,
      default: false
    },

    isDark: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  data () {
    return {
      items: [
        {
          title: 'Overview',
          icon: 'dashboard',
          to: '/'
        },
        {
          title: 'Tasks',
          icon: 'view_list',
          to: '/tasks'
        },
        {
          title: 'Timer',
          icon: 'alarm',
          to: '/timer'
        },
        {
          title: 'Stats',
          icon: 'insert_chart_outlined',
          to: '/stats'
        },
        {
          title: 'Settings',
          icon: 'settings_applications',
          to: '/settings'
        }
      ]
    }
  },

  computed: {
    themeIcon () {
      return this.isDark ? 'brightness_3' : 'brightness_5'
    }
  },

  methods: {
    onClickNavigationItem(item) {},

    onToggleTheme (isDark) {
      this.$emit('toggle-theme', isDark)
    },

    onUpdateShowDrawer (showDrawer) {
      this.$emit('show-drawer', showDrawer)
    }
  },

  watch: {
    isDark (newValue) {
      this.isDarkTheme = newValue
    }
  }
}
</script>
