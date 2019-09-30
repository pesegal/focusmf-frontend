<template>
  <v-navigation-drawer
    :value="showDrawer"
    absolute
    temporary
    @input="updateDrawerDisplayState"
  >
    <v-list>
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        exact
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider />
      <v-list-tile>
        <v-list-tile-action>
          <v-switch
            :input-value="isDark"
            @change="toggleTheme"
          />
        </v-list-tile-action>
        <v-list-tile-content>
          <v-icon>brightness_3</v-icon>
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
      default: false
    },
    isDark: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      items: [
        {
          title: 'Tasks',
          icon: 'view_list',
          to: '/dashboard/tasks'
        },
        {
          title: 'Timer',
          icon: 'alarm',
          to: '/dashboard/timer'
        },
        {
          title: 'Stats',
          icon: 'insert_chart_outlined',
          to: '/dashboard/stats'
        },
        {
          title: 'Settings',
          icon: 'settings_applications',
          to: '/dashboard/settings'
        }
      ]
    }
  },

  methods: {
    toggleTheme (isDark) {
      this.$emit('toggle-theme', isDark)
    },

    updateDrawerDisplayState (showDrawer) {
      this.$emit('update-drawer-display-state', showDrawer)
    }
  }
}
</script>
